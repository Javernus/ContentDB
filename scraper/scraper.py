"""
This module contains a class that scrapes data from imdb.com.
This is done using the requests library in combination with regular expressions and BeautifulSoup.


Made by Montijn van den Beukel
"""


import requests
import json
import re
from bs4 import BeautifulSoup as bs


class ImdbScraper():

    def __init__(self, page_count=1):
        self.page_count = 1 + (page_count - 1)  * 50
        self.s = requests.Session()
        self.url = f'https://www.imdb.com/search/title/?title_type=feature&release_date=1960-01-01,2021-12-31&view=simple&sort=alpha,asc&start={self.page_count}'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        }

        self.movies = {}
        self.genres = {}
        self.actors = []

    def write_movies(self):
        with open ('movies.json', 'w') as f:
            json.dump(self.movies, f)

    def read_movies(self):
        with open ('movies.json', 'r') as f:
            self.movies = json.load(f)

        return self.movies

    def top_rated_movies(self):
        """
        Returns a list of the top rated movies on imdb
        """

        self.url = 'https://www.imdb.com/chart/top'
        response = self.s.get(self.url, headers=self.headers)

        self.titles = re.findall(r'title=\".+\" >(.*)</a>', response.text)

        movieactors = re.findall(r'title=\"(.*)\" >.+</a>', response.text)

        for x in movieactors:
            actors = x.split(', ')
            self.actors.append(actors)

        self.ratings = re.findall(r'<strong title=\".+\">(.*)</strong>', response.text)
        self.release_dates = re.findall(r'<span class=\"secondaryInfo\">\((.*)\)</span>', response.text)

        for Id, title in enumerate(self.titles):
            summary, duration, genre, image = self.get_movie_details(title)
            self.movies[Id] = {
                'FSID': Id + 1,
                'title': title,
                'actors': self.actors.pop(0),
                'genre': genre,
                'image': image,
                'rating': round(float(self.ratings.pop(0).replace(',', '.')) / 2),
                'summary': summary,
                'release_year': int(self.release_dates.pop(0)),
                'duration': duration
            }

        self.write_movies()


    def get_movie_details(self, movie_name):
        """
        Some information about the movie is not available on the top rated page, so we need to get it from the movie page
        """

        try:
            r = self.s.get(f'https://www.imdb.com/find?q={movie_name}', headers=self.headers)

            # Parse the html using beautiful soup
            soup = bs(r.text, 'lxml')
            movie_link = soup.find('a', href=re.compile('/title/tt'))['href']

            r = self.s.get(f'https://www.imdb.com{movie_link}', headers=self.headers)

        except:
            return 'No summary available', 'No duration available'

        try:
            description = re.findall(r'\"description\":\"(.*?)\"', r.text)[0]

        except:
            description = 'No summary available'

        try:
            # Get the duration of the movie and convert it to minutes
            runtime = re.findall(
                r'Runtime</span><div class=\"ipc-metadata-list-item__content-container\">(.*?)</div></li><li role=\"presentation\"', r.text)
            runtime = re.sub(r'\D\W+', '/', runtime[0]).replace('hour', '').replace('minutes', '').split('/')
            duration = int(runtime[0]) * 60 + int(runtime[2])

        except:
            duration = 'No duration available'

        try:
            # Get the genres of the movie and convert it to a list
            genre = re.findall(r'\"genre\":\[\"(.*)\"\]', r.text)[0]
            genre = re.sub(r'\W+', ' ', genre).split(' ')
            for x in genre:
                if x == "Sci" or x == "Fi":
                    genre.remove("Sci")
                    genre.remove("Fi")
                    genre.append("Science Fiction")

        except:
            genre = 'No genre available'

        try:
            image = re.findall(r'"image":"(.*?)"', r.text)[0]

        except:
            image = 'No image available'

        return description, duration, genre, image

    def get_movies(self, page_count, start_date, end_date):
        """
        get all of the movies from imdb website in alphabetical order
        """

        self.page_count = 1 + (page_count - 1) * 50

        self.url = f'https://www.imdb.com/search/title/?title_type=feature&release_date={start_date},{end_date}&view=simple&sort=alpha,asc&start={self.page_count}'
        response = self.s.get(self.url, headers=self.headers)

        self.titles = re.findall(r'<img alt="(.*)"', response.text)
        self.images = re.findall(r'loadlate="(.*)"', response.text)
        self.ratings = re.findall(r'strong title="(.*)"', response.text)

        for x in self.titles:
            self.summary = self.get_movie_details(x)
            self.movies[x] = { 'image': self.images.pop(0), 'rating': int(self.ratings.pop(0)) / 2, 'summary': self.summary }

        return self.movies

scraper = ImdbScraper()
scraper.top_rated_movies()
