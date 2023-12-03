from flask import Flask, jsonify
from flask_restful import Resource
from pymongo import MongoClient
from requests import get
from datetime import date
from app import API_KEY
from .apod_views import api

# setting db table
client = MongoClient('mongodb://localhost:27017/')
db = client['nasa_apod']
collection = db['neo']

NASA_NEO_API = 'https://api.nasa.gov/neo/rest/v1/feed'

class NearestEarthObject(Resource):


    def get(self):
        today = date.today()

        obj = collection.find_one({"start_date": f'{today}'})

        if obj:
            neo_data = obj
            neo_data['_id'] = str(neo_data['_id'])
            
        else:   
            params = {
                'api_key': API_KEY,
                'start_date': today,
                'end_date': today,
            }
            
            response = get(NASA_NEO_API, params=params)
            neo_resp = response.json()

        #   extracting data only about the nearest object today
            neo = min(neo_resp['near_earth_objects'][str(today)], key=lambda x: x['close_approach_data'][0]['miss_distance']['kilometers'])
            
            neo_data = {
                'name':neo['name'],
                'miss_distance':neo['close_approach_data'][0]['miss_distance'],
                'relative_velocity':neo['close_approach_data'][0]['relative_velocity'],
                'orbiting_body':neo['close_approach_data'][0]['orbiting_body'],
                'hazardous':neo['is_potentially_hazardous_asteroid'],
                
            }

            collection.insert_one(neo_data)
            neo_data['_id'] = str(neo_data['_id'])


        return jsonify(neo_data)

api.add_resource(NearestEarthObject, '/api/neo')
