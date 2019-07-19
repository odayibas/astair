from __future__ import print_function
import sys
import os
from flask import Flask, render_template, g, request, make_response, Response
import json
import requests
import slackMessages
import databaseOperations
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from slackclient import SlackClient
from cryptography.fernet import Fernet

app = Flask(__name__)

db_conn = databaseOperations.connect_db()
key = Fernet.generate_key()
f = Fernet(key)
scheduler = BackgroundScheduler()
scheduler.add_job(func=databaseOperations.deleteAllSlashCommnads, args=(db_conn ,), trigger="interval", seconds=3600)
scheduler.start()

def decryptToken():
    encrypted=databaseOperations.getToken(db_conn)
    return encrypted
def getUserList():
    
    sc = SlackClient(decryptToken())
    usersID=sc.api_call(
    "users.list")
    userinfo={}
    members=usersID["members"]
    for i in range(len(members)):
        useri=members[i]
        userinfo[useri["name"]]=useri["id"]
    return userinfo

def sendLocationSurveyOneUser(username):
    
    sc = SlackClient(decryptToken())
    userinfo = getUserList()
    userid=userinfo.get(username)
    zones=databaseOperations.getACzones(db_conn)
    sc.api_call(
    "chat.postMessage",
    channel=userid,
    blocks=slackMessages.getLocationSurvey(zones)
  
)
    return make_response("Success",200)

def response_Interactive_Message(responseurl,text="Thanks :)"):
    resdata = {
    "replace_original": "true",
    "text": text
}
    x = requests.post(responseurl,data=json.dumps(resdata))
@app.route('/feedback-collector')
def index():
    return "App for Slack results (Services)"

@app.route('/feedback-collector/health')
def health():
    return "UP"

@app.route("/feedback-collector/slack/oauth", methods=["GET"])
def oauth():
    client_id=os.environ["CLIENT_ID"]
    client_secret=os.environ["CLIENT_SECRET"]
    code = request.args.get("code")
    uri= 'https://slack.com/api/oauth.access?code='+code+'&client_id='+client_id+'&client_secret='+client_secret  
    
    response=requests.post(uri)
    response=json.loads(response.content)
    print(response)
    token=response["access_token"]
    databaseOperations.setToken(db_conn,token,"admin")

    return make_response("App Installed",200)

@app.route("/feedback-collector/slack/returns", methods=["POST"])
def message_actions():
    
    form_json = json.loads(request.form["payload"])
    print(form_json)
    responseurl=form_json["response_url"]
    user = form_json["user"]
    username = user["username"]
    userid= user["id"]
    returnText="Success"
    if "accessory" not in request.form["payload"]:
        choosen= form_json["actions"]
        choosen= choosen[0]
        choosen = choosen["value"]
        text = "Thanks for voting"
        print(username)
        print(choosen)
        response_Interactive_Message(responseurl,text)
        returnText= username+" "+choosen
        databaseOperations.addVoteRecord(db_conn,username,choosen)
    else:
        actions=form_json["actions"]
        actions=actions[0]
        selectedoption=actions["selected_option"]
        selectedValue=selectedoption["value"]
        text = "Your location changed to " + selectedValue
        response_Interactive_Message(responseurl,text)
        print(username)
        print(selectedValue)
        returnText= username+" "+selectedValue
        if(selectedValue not in "degismedi"):
            databaseOperations.addLocationRecord(db_conn,username,selectedValue)
    
    
    
    return make_response(returnText,200)

@app.route("/feedback-collector/slack/airSurvey", methods=["POST"])
def sendAirSurvey(creater="Auto"):
    
    sc = SlackClient(decryptToken())
    userinfo = getUserList()
    for val in userinfo.values():
        sc.api_call(
        "chat.postMessage",
        channel=val,
        blocks= slackMessages.getAirConSurvey()
    
)  
    databaseOperations.addSurvey(db_conn,creater)
    return make_response("Success",200)

@app.route("/feedback-collector/slack/locationSurvey", methods=["POST"])
def sendLocationSurvey():
    
    sc = SlackClient(decryptToken())
    userinfo = getUserList()
    zones=databaseOperations.getACzones(db_conn)
    for val in userinfo.values():
        sc.api_call(
        "chat.postMessage",
        channel=val,
        blocks=slackMessages.getLocationSurvey(zones)
  
)
    
    return make_response("Success",200)

@app.route("/feedback-collector/slack/slash", methods=["POST"])
def collectSlashRequests():
    username=request.form["user_name"]
    command=request.form["command"]
    print(username + "  " + command)
    if(command=="/location"):
        sendLocationSurveyOneUser(username)
        return make_response("",200)
    if(command=="/sendsurvey"):
        sendAirSurvey("Manuel")
        return make_response("",200)
    if(command=="/locationall"):
        sendLocationSurvey()
        return make_response("",200)
    if(command=="/onsurveyschedule"):
        hour = request.form["text"]
        
        print(hour)
        print(int(hour))
        setSchedule(int(hour))
        return make_response("Survey schedule setted to "+ hour+" hour",200)
        
        #return make_response("Please enter proper hour",200)
    if(command=="/offsurveyschedule"):
        removeSchedule()
        return make_response("Survey schedule stopped",200)
    if(command=="/hot" or command == "/cold"):
        location = databaseOperations.getPersonLocation(db_conn,username)
        
        if(location==False):
            return make_response("Your location not found.",200)
        
        ret=databaseOperations.addSlashData(db_conn,username,location,command)
        return make_response(ret,200)
    else:
        return make_response("This command is not exist.",200)

@app.route('/feedback-collector/slack/setSchedule', methods=["POST"])
def setSchedule(hourSlash):
    hour = request.form.get("hour")
    print("schedule setted "+str(hour)+ " hours")
    scheduler.add_job(id="surveyschedule", func=sendAirSurvey, args=("Manuel",) ,trigger="interval", seconds=int(hourSlash)*3600)
    print("schedule added")
    return make_response("Success",200)

@app.route('/feedback-collector/slack/removeSchedule', methods=["POST"])
def removeSchedule():
    scheduler.remove_job("surveyschedule")
    print("Schedule removed")
    return make_response("Success",200)

@app.route("/feedback-collector/slack/heya", methods=["POST"])
def retret():
    return make_response("Success",200)

if (__name__ == '__main__'):
    app.run(debug=True,host='0.0.0.0',port=5000)
