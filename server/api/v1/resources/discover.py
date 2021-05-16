
"""
Define the REST verbs relative to the users
"""
import requests
from flask import request
from flask_restful import Resource

import config
class DiscoverResource(Resource):
    """ Verbs relative to the users """

    @staticmethod
    def get():
        page = request.args.get('page') or 1
        payload = {'api_key': config.TMDB, 'sort_by': 'popularity.desc', 'with_genres' : '16', 'with_original_language': 'ja','page' : page}
        r = requests.get("https://api.themoviedb.org/3/discover/tv", params=payload)
        return r.json()
