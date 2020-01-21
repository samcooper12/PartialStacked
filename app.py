import pandas as pd
import json
# import simplejson as json
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect
import requests
import psycopg2
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from getpass import getpass
from pprint import pprint
import os

import codecs

app = Flask(__name__)

# geo = []
file = 'counties.json'
# class MyClass:
def county():

	with open('counties.json', 'r', encoding = "ISO-8859-1") as f:
		data = json.load(f)
		type = data['type']
		features = data['features']
		# value = data['features']
		print(len(data))
		print(len(features))
		# print(data)
		return data, type, features
	return data, type, features


# ob = MyClass()

data = county()
# print(data[0])

try:
	lenny = len(data)

	print('lenny is ---- ', lenny) # lenny is ----  2

	lenny_dict = data['features']
	lenny_dict = len(lenny_dict)
	print('lenny_dict is ----- ', lenny_dict) #lenny_dict is -----  3221
except:
	print('ehh')


@app.route("/")
# @app.route("/index")
def index():
	# print('line 32  route')
    # """List all available api routes."""
    # return render_template(['index.html','index2.html'], title='Home')
    return render_template('index.html', data=data)

@app.route("/map")
def map():
    # """List all available api routes."""
    # return render_template('map.html', title='MapVisualization')
    # data = json.load(file)
    data = county()
    type = data[0]
    print(type(data))
    # return render_template('map.html', data=data, type=type, features=features)
    return render_template('map.html', data=data, type=type)

@app.route("/presentation")
def presentation():
    # """List all available api routes."""
    return render_template('presentation.html', title='Presentation')


if __name__ == '__main__':
	app.run(debug=True)