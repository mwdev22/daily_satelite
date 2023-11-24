from flask import Flask, render_template, jsonify, url_for
from flask_restful import Resource, Api, reqparse
from pymongo import MongoClient
from requests import get
from datetime import date
from app import app
from app import API_KEY

# setting db table
client = MongoClient('mongodb://localhost:27017/')
db = client['nasa_apod']
collection = db['apod']

api = Api(app)

NASA_APOD_API = "https://api.nasa.gov/planetary/apod"

# getting daily nasa apod photo
class Index(Resource):
    def get(self):
        result = collection.find_one({"date": f'{date.today()}'})
        if result:
            image_data = result
    #   if img is not in database, get it from nasa api
        else:
            params = {'api_key': API_KEY}
            response = get(NASA_APOD_API, params=params)
            rsp = response.json()
    #   scraping usefull data for my app and insering it into database
            image_data = {'date':rsp['date'], 
                            'explanation':rsp['explanation'],
                            'url':rsp['url'],
                            'title':rsp['title']
                            }
            collection.insert_one(image_data)
    #   fixing problem with mongodb returning non json serializible object id
        image_data['_id'] = str(image_data['_id'])
        return jsonify(image_data)

from flask import request

class ImageDetail(Resource):
    def get(self):
        requested_date = request.args.get('date', None)

        if requested_date:
            result = collection.find_one({"date": requested_date})

            if result:
                image_data = result
                 #   fixing problem with mongodb returning non json serializible object id
                image_data['_id'] = str(image_data['_id'])
                return jsonify(image_data)
            else:
                params = {'api_key': API_KEY}
                response = get(NASA_APOD_API, params=params)
                rsp = response.json()

                if not rsp:
                    return jsonify({"error": "Image not found for the specified date"}), 404
                else:
                    image_data = {
                        'date': rsp['date'],
                        'explanation': rsp['explanation'],
                        'url': rsp['url'],
                        'title': rsp['title']
                    }
                    collection.insert_one(image_data)
                     #   fixing problem with mongodb returning non json serializible object id
                    image_data['_id'] = str(image_data['_id'])
                    return jsonify(image_data)
        else:
            return jsonify({"error": "Date parameter is required to get specified image"}), 400

# adding resources to my api
api.add_resource(Index, '/api/today_img')
api.add_resource(ImageDetail, '/api/img_detail')