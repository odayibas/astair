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
from threading import Thread

# Flask web server for incoming traffic from Slack
app = Flask(__name__)

db_conn = databaseOperations.connect_db()
key = Fernet.generate_key()
f = Fernet(key)

scheduler = BackgroundScheduler()
scheduler.add_job(func=databaseOperations.deleteAllSlashCommnads, args=(db_conn ,), trigger="interval", seconds=3600)
scheduler.add_job(func=databaseOperations.deleteDisturb, args=(db_conn ,), trigger="interval", seconds=3600*24)
scheduler.start()

def decryptToken():

    encrypted=databaseOperations.getToken(db_conn)
    return encrypted

def getUserList():

    sc = SlackClient(decryptToken())

    usersID=sc.api_call("users.list")
    userinfo={}

    print(usersID)

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

    sc.api_call("chat.postMessage",channel=userid,blocks=slackMessages.getLocationSurvey(zones))

    return make_response("Success",200)

def response_Interactive_Message(responseurl,text="Thanks :)"):

    resdata = {"replace_original": "true","text": text}
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


@app.route("/feedback-collector/slack/onsnooze", methods=["POST"])
def onsnooze(creater,username): #Kullanıcılar kendilerine anket gönderilmesini engellemek istediğinde bu fonksiyon kullanılır.

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        for key,val in userinfo.items():
            if key == username:

                #print("Key : "+ key+"Username : "+username)
                #print("userinfo[key] : "+userinfo[key])

                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.onSnooze())
            else:
                pass

        databaseOperations.addSnoozeTable(db_conn,username)

        return make_response("",200)


@app.route("/feedback-collector/slack/offsnooze", methods=["POST"])
def offSnooze(creater,username): #Kullanıcılar kendilerine tekrar anket gelmesini istediklerinde bu fonksiyon çalışır.

    with app.app_context():

        sc = SlackClient(decryptToken())

        userinfo = getUserList()

        databaseOperations.deleteSnoozeTableName(db_conn, username)

        for key, val in userinfo.items():
            if key == username:

                #print("Key : " + key + "Username : " + username)
                #print("userinfo[key] : " + userinfo[key])

                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.offSnooze())
            else:
                pass

        return make_response("Success", 200)


@app.route("/feedback-collector/slack/airSurvey", methods=["POST"])
def sendAirSurvey(creater):

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name=databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)

        new = list()
        tut = 0

        for key,val in userinfo.items():
            for j in username:

                if j[0]==key:
                    print("j[0]:"+j[0]+" key: " + key)
                    tut = 0
                    for i in name:
                        print("i[0] : "+ i[0])
                        if j[0]== i[0]:
                            tut = 1
                            break
                        else:
                            tut = 0

                    if tut==0:
                        new.append(userinfo[j[0]])

                    else:
                        pass

                else:
                    pass

        print(new)

        for i in userinfo.values():
            print(i+"\n")
            for k in new:
                print("+++++"+k)
                if k==i:
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.getAirConSurvey())
                else:
                    pass


        databaseOperations.addSurvey(db_conn,"Auto")
        return make_response("Success",200)


@app.route("/feedback-collector/slack/locationSurvey", methods=["POST"])
def sendLocationSurvey(creater):

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()
        print(userinfo)

        zones=databaseOperations.getACzones(db_conn)

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)

        new = list()
        tut = 0

        for key, val in userinfo.items():
            for j in username:

                if j[0] == key:
                    print("j[0]:" + j[0] + " key: " + key)
                    tut = 0
                    for i in name:
                        print("i[0] : " + i[0])
                        if j[0] == i[0]:
                            tut = 1
                            break
                        else:
                            tut = 0

                    if tut == 0:
                        new.append(userinfo[j[0]])

                    else:
                        pass

                else:
                    pass

        print(new)

        for i in userinfo.values():
            print(i + "\n")
            for k in new:
                print("+++++" + k)
                if k == i:
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.getLocationSurvey(zones))
                else:
                    pass



        return make_response("Success",200)


@app.route("/feedback-collector/slack/checkAcZone", methods=["POST"])
def checkAcZone(creater):

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)

        new = list()
        tut = 0

        for key, val in userinfo.items():
            for j in username:

                if j[0] == key:
                    print("j[0]:" + j[0] + " key: " + key)
                    tut = 0
                    for i in name:

                        if j[0] == i[0]:
                            tut = 1
                            break
                        else:
                            tut = 0

                    if tut == 0:
                        new.append(userinfo[j[0]])

                    else:
                        pass

                else:
                    pass

        print(new)

        for i in userinfo.values():
            for k in new:
                if k == i:
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.checkAcZone())
                else:
                    pass

        return make_response("Success", 200)

@app.route("/feedback-collector/slack/locationimage", methods=["POST"])
def locationimage(creater):

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)


        new = list()
        tut = 0

        for key, val in userinfo.items():
            for j in username:

                if j[0] == key:

                    tut = 0
                    for i in name:

                        if j[0] == i[0]:
                            tut = 1
                            break
                        else:
                            tut = 0

                    if tut == 0:
                        new.append(userinfo[j[0]])

                    else:
                        pass

                else:
                    pass

        print(new)

        for i in userinfo.values():

            for k in new:

                if k == i:
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.locationimage())
                else:
                    pass


        return make_response("Success", 200)

@app.route("/feedback-collector/slack/returns", methods=["POST"])
def message_actions():

    form_json = json.loads(request.form["payload"])
    print("====================", form_json)
    responseurl=form_json["response_url"]

    user = form_json["user"]
    username = user["username"]
    userid= user["id"]

    returnText="Success"

    tut = 0

    if "accessory" not in request.form["payload"]:

        if form_json["actions"][0]["value"] != "zone":

            chosen= form_json["actions"]

            chosen= chosen[0]

            chosen = chosen["value"]

            text = "Thanks for voting"

            print("Username2: " +username)
            print("Chosen3:" + chosen)

            response_Interactive_Message(responseurl,text)
            returnText= username+" "+chosen
            databaseOperations.addVoteRecord(db_conn,username,chosen)


        elif form_json["actions"][0]["value"] == "zone":

            location = databaseOperations.getPersonLocation(db_conn, username)
            text = "You are in AC zone: " + str(location)
            response_Interactive_Message(responseurl, text)

        else:
            pass

    else:

        if form_json["actions"][0]["type"] == "datepicker":

            tut = 1

            chosen = form_json["actions"]
            chosen = chosen[0]
            selecteddate = chosen["selected_date"]

            print("Usename3:" + username)
            print("Selectedvalue2:" + selecteddate)

            returnText = selecteddate

            databaseOperations.adddateRecord(db_conn, username, selecteddate,"","")

            data = databaseOperations.emptyorfull(db_conn)

            full = list()


            for i in data:
                if(i[0]==selecteddate):
                    full.append((str(i[1]),str(i[2])))

            text = "Datepicker selected to " + selecteddate+"\n"

            kontrol =0

            for i in full:

                if(i[0]=='None' or i[1]=='None'):
                    pass

                else:
                    kontrol=1
                    text +=i[0] +" is full between "+ i[1] +"\n"

            if(kontrol==1):
                text += " hours. You can select the meeting room and time according to these values."

            response_Interactive_Message(responseurl, text)


        if form_json["actions"][0]["type"] == "static_select":

            actions=form_json["actions"]
            actions=actions[0]
            selectedoption=actions["selected_option"]
            selectedValue=selectedoption["value"]

            if(selectedValue == "1" or selectedValue == "2" or selectedValue == "3" or selectedValue == "4" or selectedValue == "5" ):

                text = "Your location changed to " + selectedValue
                response_Interactive_Message(responseurl,text)


                returnText= username+" "+selectedValue

                if(selectedValue not in "degismedi"):
                    databaseOperations.addLocationRecord(db_conn,username,selectedValue)



            if(selectedValue=="Meeting room 1" or selectedValue=="Meeting room 2" or selectedValue=="Meeting room 3"):

                response_Interactive_Message(responseurl)
                returnText = username + " " + selectedValue

                text = "Meetingroom selected to " + selectedValue
                response_Interactive_Message(responseurl, text)
                returnText = username + " " + selectedValue

                databaseOperations.adddateRecord(db_conn, username, "", selectedValue,"")


            if form_json["actions"][0]["placeholder"]["text"] == "Select a clock":

                returnText = username + " " + selectedValue

                databaseOperations.adddateRecord(db_conn, username,"","",selectedValue)
                data = databaseOperations.control(db_conn)

                print("selected clock : ",selectedValue)

                k=0


                for index in range(len(data)-1):
                    jIndex = index + 1
                    i = data[index];
                    for _ in range(len(data)- 1 - index):
                        j = data[jIndex];

                        if(i[2]==j[2] and i[3]==j[3]):

                            if(k==1):
                                break

                            else:

                                if(selectedValue == i[4]):

                                    databaseOperations.deletemeeting(db_conn,j[1],j[2],j[3],j[4])

                                    k=1
                                    break

                                else:
                                    k=0


                        else:
                            pass
                        jIndex += 1


                if(k==1):
                    text2 = "Clock selected to " + selectedValue + " but \n This room is full on dates. Please call '/meeting' again and select a new one."
                    response_Interactive_Message(responseurl, text2)

                else:
                    text2 = "Clock selected to " + selectedValue
                    response_Interactive_Message(responseurl, text2)

        else:
            pass


    return make_response(returnText,200)

@app.route("/feedback-collector/slack/sendmeetingservey", methods=["POST"])
def sendMeetingservey(creater,username):
   with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        for key, val in userinfo.items():
            if key == username:

                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.calendar())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.meeting_room())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.clocks())

            else:
                pass

        return make_response("", 200)


@app.route("/feedback-collector/slack/slash", methods=["POST"])
def collectSlashRequests():

    username=request.form["user_name"]
    command=request.form["command"]

    print(username + "  " + command)

    if (command == "/meeting"):

        sendMeetingservey("Manuel",username)
        return make_response("", 200)

    if(command=="/location"):

        sendLocationSurveyOneUser(username)
        return make_response("",200)

    if(command=="/snoozeon"):

        onsnooze("Manuel",username)
        return make_response("", 200)

    if (command == "/snoozeoff"):

        offSnooze("Manuel", username)
        return make_response("", 200)

    if(command=="/sendsurvey"):

        thread_sendAirSurvey = Thread(target=sendAirSurvey, args=("Manuel",))
        thread_sendAirSurvey.start()

        return make_response("",200)

    if(command=="/locationall"):

        thread_checkaczone = Thread(target=checkAcZone,args=("Manuel",))
        thread_sendlocationsurvey = Thread(target=sendLocationSurvey,args=("Manuel",))
        thread_locationimage = Thread(target=locationimage, args=("Manuel",))

        thread_locationimage.start()
        thread_checkaczone.start()
        thread_sendlocationsurvey.start()

        return make_response("",200)

    if(command=="/onsurveyschedule"):

        minute_servey = request.form["text"]

        print(minute_servey)
        print(int(minute_servey))

        setSchedule(int(minute_servey))
        return make_response("Survey schedule setted to "+ minute_servey+" minute",200)

    if(command=="/offsurveyschedule"):

        removeSchedule()
        return make_response("Survey schedule stopped",200)


    if (command == "/onlocationschedule"):

        minute_location= request.form["text"]

        print(minute_location)
        print(int(minute_location))

        setScheduleLocation(int(minute_location))
        return make_response("Location schedule setted to " + minute_location + " minute", 200)

    if (command == "/offlocationschedule"):

        removeScheduleLocation()
        return make_response("Location schedule stopped", 200)


    if(command=="/hot" or command == "/cold"):
        location = databaseOperations.getPersonLocation(db_conn,username)

        if(location==False):
            return make_response("Your location not found.",200)

        ret=databaseOperations.addSlashData(db_conn,username,location,command)
        return make_response(ret,200)

    else:
        return make_response("This command is not exist.",200)


@app.route('/feedback-collector/slack/setSchedule', methods=["POST"])
def setSchedule(minuteSlash):

    minute_servey = request.form.get("minute_servey")
    print("schedule setted "+str(minute_servey)+ " minute_servey")
    scheduler.add_job(id="surveyschedule", func=sendAirSurvey, args=("Auto",) ,trigger="interval", seconds=int(minuteSlash)*60*15) #15 dakika
    print("schedule added")

    return make_response("Success",200)


@app.route('/feedback-collector/slack/removeSchedule', methods=["POST"])
def removeSchedule():

    scheduler.remove_job("surveyschedule")
    print("Schedule removed")
    return make_response("Success",200)


@app.route('/feedback-collector/slack/setScheduleLocation', methods=["POST"])
def setScheduleLocation(minuteSlash):

    minute_location = request.form.get("minute_location")
    print("schedule setted "+str(minute_location)+ "minute")

    scheduler.add_job(id="checkackzone", func=checkAcZone, args=("Auto",), trigger="interval", seconds=int(minuteSlash) * 60 * 60 * 12) #12 saat
    scheduler.add_job(id="locationimageschedule", func=locationimage, args=("Auto",), trigger="interval",
                      seconds=int(minuteSlash) * 60)

    scheduler.add_job(id="locationschedule", func=sendLocationSurvey, args=("Auto",) ,trigger="interval", seconds=int(minuteSlash)*60)

    print("Location added")
    return make_response("Success",200)


@app.route('/feedback-collector/slack/removeScheduleLocation', methods=["POST"])
def removeScheduleLocation():
    scheduler.remove_job("locationimageschedule")
    scheduler.remove_job("checkackzone")
    scheduler.remove_job("locationschedule")

    print("Schedule removed")

    return make_response("Success",200)


@app.route("/feedback-collector/slack/heya", methods=["POST"])
def retret():
    return make_response("Success",200)


if (__name__ == '__main__'):
    app.run(debug=True,host='0.0.0.0',port=5000)
