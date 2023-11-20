from flask import Flask, render_template, jsonify
from pymongo import MongoClient
import requests
from datetime import date

app = Flask(__name__)

# have to configure mongo and nasa api
client = MongoClient('mongodb://localhost:27017/')
db = client['nasa_apod']
collection = db['apod']


NASA_APOD_API = "https://api.nasa.gov/planetary/apod"
API_KEY = 'api_key_nasa'  

@app.route('/')
def index():
    
    result = collection.find_one({"date": f'{date.today()}'})  
    print(result)
    # checking if img is already stored in db
    if result:
        image_data = result
    else:
    # downloading the todays nasa photo
        params = {'api_key': API_KEY}
        response = requests.get(NASA_APOD_API, params=params)
        image_data = response.json()

    # saving img to database 
        collection.insert_one(image_data)

    return '<h1>index</h1>'

@app.route('/images_list')
def all_images():
    # informations about all saved images since app is working in json
    all_images_data = list(collection.find())

    # returning data of images
    return jsonify(all_images_data)
