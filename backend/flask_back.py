import pymongo
from flask import Flask, abort
from flask import request
from flask_cors import CORS, cross_origin
from bson import ObjectId
import flask
import json
import requests
from telethon.sync import TelegramClient
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.functions.channels import GetParticipantsRequest
from telethon.tl.functions.users import GetFullUserRequest
from telethon.tl.types import ChannelParticipantsSearch
import telethon.errors
import time
import datetime
import logging

logging.basicConfig(filename="flask_app.log",
                            filemode='a',
                            format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                            datefmt='%H:%M:%S',
                            level=logging.INFO)
logging.info("Running backend")

conn = pymongo.MongoClient("localhost", 27017)

api_id = 930961
api_hash = '7b9e48ce403fb3cd47bb20185141c5cb'
phone = '+79196471299'

client = TelegramClient(phone, api_id, api_hash)
client.connect()

if not client.is_user_authorized():
    client.send_code_request(phone)
    client.sign_in(phone, input('Enter the code: '))


app = Flask(__name__)
CORS(app)

def serial(dct):
    for k in dct:
        if isinstance(dct[k], ObjectId):
            dct[k] = str(dct[k])
    return dct

@app.route('/users', methods=['POST'])
def cookies():
    request_us = request.json
    users = conn.local.Users
    for key in request_us:
        if request_us[key] == '':
            request_us[key]="QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"

    users_cursor = users.find({"$or":[
        {"first_name":request_us.get("first_name")},
        {"last_name":request_us.get("last_name")},
        {"phone":request_us.get("phone")},
        {"username":request_us.get("username")},
        {"phone":request_us.get("phone")},
        {"scam":request_us.get("scam")},
        {"chats":request_us.get("chat_name")},
        {"id":request_us.get("id")},
    ]})

    users_response = {}
    i=0
    for user in users_cursor:
        users_response[i]= serial(user)
        i=i+1
    return(users_response)

@app.route('/messages', methods=['POST'])
def messages():
    users = conn.local.Users
    request_us = request.json
    user_id = request_us["id"]
    user_req = users.find_one({"id":int(user_id)})
    messages_res = []
    for chat in user_req["chats"]:
        for message in client.iter_messages(chat, limit=3000):
            if int(user_req["id"]) == int(message.sender_id):
                unixtime = time.mktime(message.date.timetuple())
                message_set = {}
                message_set["text"]=message.text
                message_set["time"]=unixtime
                message_set["chat"]=chat
                messages_res.append(message_set)
    print(messages_res)
    return({"data":messages_res})

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port = 1338)
