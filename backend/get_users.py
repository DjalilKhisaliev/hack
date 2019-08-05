from telethon.sync import TelegramClient
from telethon.tl.functions.channels import JoinChannelRequest
from telethon.tl.functions.channels import GetParticipantsRequest
from telethon.tl.functions.users import GetFullUserRequest
from telethon.tl.types import ChannelParticipantsSearch
import telethon.errors
import time
import pymongo
import logging

logging.basicConfig(filename="flask_app.log",
                            filemode='a',
                            format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                            datefmt='%H:%M:%S',
                            level=logging.INFO)
logging.info("Running get users from chats")

f = open("chats.txt", "r")


api_id = 930961
api_hash = '7b9e48ce403fb3cd47bb20185141c5cb'
phone = '+79196471299'

conn = pymongo.MongoClient("185.203.118.3", 27017)
users = conn.local.Users


client = TelegramClient(phone, api_id, api_hash)
client.connect()

def xstr(s):
    if s is None:
        return ''
    return str(s)

if not client.is_user_authorized():
    client.send_code_request(phone)
    client.sign_in(phone, input('Enter the code: '))

for chat in f.readlines():
    chat = chat.replace('\n', '')
    try:
        participants = client(GetParticipantsRequest(
                chat, ChannelParticipantsSearch(''), 0, 10000, hash=0
            ))
        for user in participants.users:
            user_info = {}
            user_info["first_name"] = xstr(user.first_name)
            user_info["last_name"] = xstr(user.last_name)
            user_info["username"] = xstr(user.username)
            user_info["phone"] = xstr(user.phone)
            user_info["about"] = xstr(client(GetFullUserRequest(user)).about)
            user_info["scam"] = user.scam
            user_info["id"] = user.id
            logging.info("Chat: {0}, nickname: {1}, count: {2}".format(chat, user_info["username"], str(participants.count)))
            if users.find_one({"id":user.id})==None:
                users.insert_one(user_info)
                users.update_one({"id" : user.id}, { "$push": { "chats": chat } })
            else:
                users.update_one({"id" : user.id}, { "$set": user_info })
                users.update_one({"id" : user.id}, { "$push": { "chats": chat } })

        time.sleep(20)
    except Exception as ex:
        logging.error("Chat: {0}, Error: {1}".format(chat, ex))
        time.sleep(100)
