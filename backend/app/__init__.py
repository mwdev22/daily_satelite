from flask import Flask
from flask_cors import CORS
from decouple import config

API_KEY = config('API_KEY') 
app = Flask(__name__)
CORS(app)


from app import apod_views
from app import neo_views

