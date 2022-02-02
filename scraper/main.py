"""
This module contains a class that can put data received from the scraper into a MySQL database.

Made by Montijn van den Beukel
"""

from dotenv import load_dotenv
import mysql.connector
import os
import json

## load .env variables
load_dotenv()

## put env variables into variables
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = os.getenv('MYSQL_PORT')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')

class DBConnector():

    def __init__(self, _host, _port, _username, _password):

        print(f"Connecting to database using: {_username}@{_host}:{_port}")
        # Configure database
        self.mydb = mysql.connector.connect(
            host=_host,
            port=_port,
            db='contentdb',
            user=_username
        )

        print("Initialized database connection.")


        with open('movies.json', 'r') as f:
            self.top_rated_movies = json.load(f)

        with open('tv_shows.json', 'r') as f:
            self.top_rated_series = json.load(f)

    def insert_movie_tables(self):
        self.insert_movie_table()
        self.insert_movie_genres()
        self.insert_movie_actors()

    def insert_user_tables(self):
        self.insert_user_table()
        self.insert_user_type()
        self.insert_user_comments()
        self.insert_user_lists()
        self.insert_user_favorites()

    def insert_movie_table(self):
        """
        Inserts all of the movies into the database.
        """
        mycursor = self.mydb.cursor()

        val_list = []

        sql = "INSERT INTO content (FSID, Title, Image, Description, Rating, Duration, ReleaseYear) VALUES (%s, %s, %s, %s, %s, %s,%s)"

        for FSID, movie in self.top_rated_movies.items():
            val_list.append((movie['FSID'], movie['title'], movie['image'], movie['summary'], movie['rating'], movie['duration'], movie['release_year']))

        for FSID, series in self.top_rated_series.items():
            val_list.append((series['FSID'], series['title'], series['image'], series['summary'], series['rating'], series['duration'], series['release_year']))

        mycursor.executemany(sql, val_list)

        self.mydb.commit()

        print(mycursor.rowcount, "records inserted.")

    def insert_movie_genres(self):
        """
        1. get all movie FSIDs
        2. for each movie, get genres
        3. for each genre, get genre id
        4. insert every genre from every movie into genres table
        """
        genres = [
            'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
            'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
        ]

        self.genres = {}
        val_list = []

        # Assign an id to each genre
        for GID, genre in enumerate(genres):
            self.genres[genre] = {
                'GID': GID
            }

        sql = "INSERT INTO genres (FSID, Genre, GID) VALUES (%s, %s, %s)"

        mycursor = self.mydb.cursor()


        GID = 0

        # loop trough every genre per movie
        for FSID, movie in self.top_rated_movies.items():
            for genre in movie['genre']:
                if genre in self.genres:
                    val_list.append((movie['FSID'], genre, GID))
                    GID += 1

        # loop trough every genre per series
        for FSID, series in self.top_rated_series.items():
            for genre in series['genre']:
                if genre in self.genres:
                    val_list.append((series['FSID'], genre, GID))
                    GID += 1


        mycursor.executemany(sql, val_list)

        self.mydb.commit()

        print(mycursor.rowcount, "records inserted.")


    def insert_movie_actors(self):
        """
        logic:
        1. get all movie FSIDs
        2. for each movie, get actors
        4. insert every actor from every movie into actors table
        """
        val_list = []

        sql = "INSERT INTO actors (FSID, Actor, AID) VALUES (%s, %s, %s)"

        mycursor = self.mydb.cursor()

        AID = 0

        for FSID, movie in self.top_rated_movies.items():
            for actor in movie['actors']:
                if "(dir.)" not in actor:
                    val_list.append((movie['FSID'], actor, AID))
                    AID += 1

        for FSID, series in self.top_rated_series.items():
            for actor in series['actors']:
                if "(dir.)" not in actor:
                    val_list.append((series['FSID'], actor, AID))
                    AID += 1

        mycursor.executemany(sql, val_list)

        self.mydb.commit()

        print(mycursor.rowcount, "records inserted.")


database = DBConnector(MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD)

###! Run functions
database.insert_movie_tables()
# database.insert_user_tables()
