# ContentDB

This project entails the creation of a service where users can keep track of their content. What do they want to watch, what have they already watched, what have they enjoyed?

## Group

The group consists of
Jake Jongejans - 13622552
Mario Patroza - 14128837
Montijn van den Beukel - StudentID
Timo Doherty - StudentID

## Website

You can find the website at https://www.umbrim.com/. Have a sublime stay!

## Admin account

Username: TBD
Password: TBD

## API guide

The api usage is very simple. To use it simply create a `GET` request to the url in the following format:

    https://www.umbrim.com/api/movie/{movie}
Where {movie} can be the unique FSID or the title where spaces are replaced by `-`.
To get additional functionality the url can also be:

    https://www.umbrim.com/api/movie/{genres | actors}/{movie}
This way the server returns information about either the genres or top actors regarding given movie or tv show.
All responses are in JSON format so the information is easy to use. Here is an example of a simple python script that sends an api request and returns the information:
```py
import requests

def get_api_data(url):
    response = requests.get(url)
    return response.json()

get_api_data("http://localhost:8080/api/movie/the-godfather")
```

Which returns:
```json
{
  "FSID": 2,
  "Title": "The Godfather",
  "Image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR8,0,380,562_.jpg ",
  "Description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
  "Rating": 5,
  "Duration": 175,
  "ReleaseYear": 1972
}
```

## Acknowledgement

We have adapted the loader design from https://codepen.io/camdenfoucht/pen/BVxawq.

The layout of the API is based on https://github.com/shahbaz17/php-rest-api.
