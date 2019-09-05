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

def responseErrorMessage(responseurl, text="Thanks :)"):
    resdata = {
        {
            "type": "context",
            "elements": [
                {

                    "text": "*Author:* T. M. Schwartz",
                    "color": "FF0000"
                }
            ]
        }
	}
    x = requests.post(responseurl, data=json.dumps(resdata))

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
def sendAirSurvey(creater): #Bu fonksiyon hava durumu için anket gönderir

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name=databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn) ##personalinfo tablosundaki,stajdakilerin,isimleri

        #for i in name:
            #print(i[0])

        #for i in username:
            #print(i[0])

        new = list()
        tut = 0

        for key,val in userinfo.items(): #tüm personel
            for j in username: #stajdakiler

                if j[0]==key: #sadece z
                    print("j[0]:"+j[0]+" key: " + key)
                    tut = 0
                    for i in name: #snooze tablosundakiler ve stajdakiler
                        print("i[0] : "+ i[0])
                        if j[0]== i[0]:
                            tut = 1
                            break
                        else:
                            tut = 0

                    if tut==0:
                        new.append(userinfo[j[0]]) #veritabanında bulunan snooze tablosunda olmayanları yeni bir listeye ekler

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
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.getAirConSurvey()) #Yeni listedekilere anket gönderir
                else:
                    pass


        databaseOperations.addSurvey(db_conn,"Auto")
        return make_response("Success",200)


@app.route("/feedback-collector/slack/locationSurvey", methods=["POST"])
def sendLocationSurvey(creater): #Bu fonksiyon lokasyon anketini gönderir.

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()
        print(userinfo)

        zones=databaseOperations.getACzones(db_conn)

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)  ##personalinfo tablosundaki,stajdakilerin,isimleri

        # for i in name:
        # print(i[0])

        # for i in username:
        # print(i[0])

        new = list()
        tut = 0

        for key, val in userinfo.items():  # tüm personel
            for j in username:  # stajdakiler

                if j[0] == key:  # sadece z
                    print("j[0]:" + j[0] + " key: " + key)
                    tut = 0
                    for i in name:  # snooze tablosundakiler ve stajdakiler
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
def checkAcZone(creater): #Kullanıcıların önceki yerlerini gösteren fonksiyondur.

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)  ##personalinfo tablosundaki,stajdakilerin,isimleri

        # for i in name:
        # print(i[0])

        # for i in username:
        # print(i[0])

        new = list()
        tut = 0

        for key, val in userinfo.items():  # tüm personel
            for j in username:  # stajdakiler

                if j[0] == key:  # sadece z
                    print("j[0]:" + j[0] + " key: " + key)
                    tut = 0
                    for i in name:  # snooze tablosundakiler ve stajdakiler
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
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.checkAcZone())
                else:
                    pass

        return make_response("Success", 200)

@app.route("/feedback-collector/slack/locationimage", methods=["POST"])
def locationimage(creater): #Blueprint i gösterir.

    with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        name = databaseOperations.getSnoozeTableName(db_conn)
        username = databaseOperations.getPersonalinfo(db_conn)  ##personalinfo tablosundaki,stajdakilerin,isimleri

        # for i in name:
        # print(i[0])

        # for i in username:
        # print(i[0])

        new = list()
        tut = 0

        for key, val in userinfo.items():  # tüm personel
            for j in username:  # stajdakiler

                if j[0] == key:  # sadece z
                    print("j[0]:" + j[0] + " key: " + key)
                    tut = 0
                    for i in name:  # snooze tablosundakiler ve stajdakiler
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
                    sc.api_call("chat.postMessage", channel=i, blocks=slackMessages.locationimage())
                else:
                    pass


        return make_response("Success", 200)



@app.route("/feedback-collector/slack/returns", methods=["POST"])
def message_actions():
    global timeValueInt
    form_json = json.loads(request.form["payload"])
    print("====================", form_json)
    responseurl = form_json["response_url"]

    user = form_json["user"]
    username = user["username"]
    userid = user["id"]

    returnText = "Success"

    tut = 0

    if "accessory" not in request.form["payload"]:

        if form_json["actions"][0]["value"] != "zone":

            chosen = form_json["actions"]

            chosen = chosen[0]

            chosen = chosen["value"]

            text = "Thanks for voting"

            print("Username2: " + username)
            print("Chosen3:" + chosen)

            response_Interactive_Message(responseurl, text)
            returnText = username + " " + chosen
            databaseOperations.addVoteRecord(db_conn, username, chosen)


        elif form_json["actions"][0]["value"] == "zone":

            location = databaseOperations.getPersonLocation(db_conn, username)
            text = "You are in AC zone: " + str(location)
            response_Interactive_Message(responseurl, text)

        else:
            pass

    else:
        if form_json["actions"][0]["action_id"] == "datepickerbike":  # TAKVİM

            tut = 1

            chosen = form_json["actions"]
            chosen = chosen[0]
            selecteddate = chosen["selected_date"]

            print("Usename3:" + username)
            print("Selectedvalue2:" + selecteddate)

            returnText = selecteddate

            databaseOperations.adddateRecordbiking(db_conn, username, selecteddate, "", "")
            response_Interactive_Message(responseurl, "Selected date:"+selecteddate)

            data = databaseOperations.emptyorfullbiking(db_conn)

            full = list()

            # seçilen güne göre dolu odaları ve saatleri gösterir.
            for i in data:
                if (i[0] == selecteddate):
                    print("Dolu bisikletler: ", str(i[1]), "Dolu saatler:", str(i[2]))
                    full.append((str(i[1]), str(i[2])))

            text = "Selected to" + selecteddate + "\n"

            kontrol = 0

            for i in full:

                if (i[0] == 'None' or i[1] == 'None'):
                    pass

                else:
                    kontrol = 1
                    text += i[0] + " is full between " + i[1] + "\n"

            if (kontrol == 1):
                text += " hours. You can select the biking and time according to these values."

                response_Interactive_Message(responseurl, text)


        if form_json["actions"][0]["action_id"] == "staticselectbike": #BİKE CHOOSE

            print("====================staticselectbike", form_json)
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            selectedValue = selectedoption["value"]
            print("Burası Value değeri",selectedValue)


            if (selectedValue == "Bike 1" or selectedValue == "Bike 2" or selectedValue == "Bike 3"):


                text = "Selected bike:" + selectedValue

                returnText = username + " " + selectedValue

                databaseOperations.adddateRecordbiking(db_conn, username, "", selectedValue, "")
                response_Interactive_Message(responseurl, text)

        if form_json["actions"][0]["action_id"] == "clock_id3": #saat
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            #başlangıç saati
            selectedValue = selectedoption["value"]
            print("*****bisiklet kullanımı başlangıç saati*****:",selectedValue)

            databaseOperations.addtemporarytimes(db_conn,selectedValue)

            returnText = "Start time:" + selectedValue
            response_Interactive_Message(responseurl, returnText)
        if form_json["actions"][0]["action_id"] == "clock_id4":  # saat
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]

            # bisiklet kullanımı bitiş saati
            finishtime = selectedoption["value"]
            print("Bitiş saati:", finishtime)

            returnText = username + " " + finishtime


            # önceki işlemler

            veri = databaseOperations.taketimes(db_conn)
            #bisiklet kullanımı başlangıç saati
            starttime=veri[0][0]

            print("veri",starttime)

            data = databaseOperations.emptyorfullbiking(db_conn)
            full = list()
            #Seçilen Son tarih
            lastdate = databaseOperations.lastdateforbiking(db_conn)
            lastdate = lastdate[0][0]
            print("lastdate", lastdate)
            #Seçilen Son bisiklet
            lastbike=databaseOperations.lastbikeforbiking(db_conn)
            lastbike=lastbike[0][0]


            #Karşılaştırma için verilerin hazırlanması
            s=starttime[0:2] + starttime[3:5]
            s1=int(s)
            print("s1",s1)
            s22=finishtime[0:2] + finishtime[3:5]
            s2=int(s22)
            print("s2",s2)

            timeresult = starttime + "-" + finishtime

            listeclocks=list()
            k=0
            for i in data:
                if (i[0] == lastdate and i[1]==lastbike):
                    print("i[3]",i[2])
                    if(i[2] == None):
                        pass
                    else:
                        print("i deger", i)
                        listeclocks = i[2].split("-")
                        a = listeclocks[0]
                        b = listeclocks[1]
                        print("listeclocks[0]", listeclocks[0])
                        print("listeclocks[1]", listeclocks[1])

                        # veritabanındaki veriler
                        c = a[0:2] + a[3:5]
                        x = int(c)
                        print("veritabanı saat baslangıc",x)
                        d = b[0:2] + b[3:5]
                        y = int(d)
                        print("veritabanı saat bitiş",y)
                        if not ((s1 < x and s2 <= x) or (s1 >= y and s2 > y)):
                            k = 1

                        else:
                            pass
                else:
                    pass

            if(k==0):
                if (s2 > s1):
                    databaseOperations.adddateRecordbiking(db_conn, username, "", "", timeresult)
                    response_Interactive_Message(responseurl, "End time:" + finishtime+" \n Clock selected to:"+timeresult)
                else:
                    response_Interactive_Message(responseurl, "*Select an end time greater than the start time*.\nPlease call '/biking' again and select a new one.")
                    databaseOperations.deletebikinglastrow(db_conn)
            else:
                response_Interactive_Message(responseurl,"*Clock selected to:" + timeresult + " but \n *This bike is full on dates*. Please call '/biking' again and select a new one.")
                databaseOperations.deletebikinglastrow(db_conn)


        if form_json["actions"][0]["action_id"] == "datepickerroom":  # datepicker da bir yere tıklandığında (ROOM TAKVİM)

            tut = 1

            chosen = form_json["actions"]
            chosen = chosen[0]
            selecteddate = chosen["selected_date"]

            print("Usename3:" + username)
            print("Selectedvalue2:" + selecteddate)

            returnText = selecteddate

            databaseOperations.adddateRecord(db_conn, username, selecteddate, "", "")

            data = databaseOperations.emptyorfull(db_conn)

            full = list()

            # seçilen güne göre dolu odaları ve saatleri gösterir.
            for i in data:
                if (i[0] == selecteddate):
                    print("Dolu odalar : ", str(i[1]), "Dolu saatler:", str(i[2]))
                    full.append((str(i[1]), str(i[2])))

            text = "Selected to " + selecteddate + "\n"

            kontrol = 0

            for i in full:

                if (i[0] == 'None' or i[1] == 'None'):
                    pass

                else:
                    kontrol = 1
                    text += i[0] + " is full between " + i[1] + "\n"

            if (kontrol == 1):
                text += " hours. You can select the meeting and time according to these values."

            response_Interactive_Message(responseurl, text)
        if form_json["actions"][0]["action_id"] == "location1":
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            selectedValue = selectedoption["value"]

            if (selectedValue == "1" or selectedValue == "2" or selectedValue == "3" or selectedValue == "4" or selectedValue == "5"):
                text = "Your location changed to " + selectedValue
                response_Interactive_Message(responseurl, text)

                print("Usename3:" + username)
                print("Selectedvalue2:" + selectedValue)

                returnText = username + " " + selectedValue

                if (selectedValue not in "Degismedi"):
                    databaseOperations.addLocationRecord(db_conn, username, selectedValue)
                    print("değişmedi")

                


        if form_json["actions"][0]["action_id"] == "static_selectroom": #ROOM CHOOSE

            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            selectedValue = selectedoption["value"]
            print("************static_selectroomvalue",selectedValue)

            if (selectedValue == "Meeting room 1" or selectedValue == "Meeting room 2" or selectedValue == "Meeting room 3"):

                returnText = "Selected room:" + " " + selectedValue

                databaseOperations.adddateRecord(db_conn, username, "", selectedValue, "")
                text = "Selected to " + selectedValue
                response_Interactive_Message(responseurl, text)

        if form_json["actions"][0]["action_id"] == "clock_id1":  # saat
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            # Toplantı başlangıç saati
            selectedValue = selectedoption["value"]
            print("*****bike_clock_id*****:", selectedValue)

            databaseOperations.addtemporarytimes(db_conn, selectedValue)


            returnText ="Start time:" + selectedValue
            response_Interactive_Message(responseurl, returnText)

        if form_json["actions"][0]["action_id"] == "users_select":  # ATTENDEES CHOOSE

            print("====================users_select", form_json)
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_user"]
            print("Burası User değeri1", selectedoption)
            selectedValue = selectedoption["real_name"]
            print("Burası User değeri", selectedValue)

        if form_json["actions"][0]["action_id"] == "clock_id2":  # saat
            actions = form_json["actions"]
            actions = actions[0]
            selectedoption = actions["selected_option"]
            #Toplantı bitiş saati
            selectedValue = selectedoption["value"]
            print("*****bike_clock_id*****:", selectedValue)


            starttime1 = databaseOperations.taketimes(db_conn)
            #Toplantı baslangıç saati

            starttime1 = starttime1[0][0]
            print("starttime1", starttime1)

            #Toplantı bitiş saati
            timeresult1 = starttime1 + "-" + selectedValue

            #saat birleşimi
            print("timeresult", timeresult1)

            # clocks tablosundaki veriler
            clockdata1 = databaseOperations.saat(db_conn)
            print("clockdata1",clockdata1)


            #eklenen Son tarih
            lastdate1 = databaseOperations.lastdateformeeting(db_conn)
            lastdate1 = lastdate1[0][0]
            # eklenen Son oda
            lastroom = databaseOperations.lastmeetformeeting(db_conn)
            lastroom = lastroom[0][0]

            #saat karşılaştırma işlemleri için verinin hazırlanması
            m = starttime1[0:2] + starttime1[3:5]
            m1 = int(m)
            print("m1", m1)
            m22 = selectedValue[0:2] + selectedValue[3:5]
            m2 = int(m22)
            print("m2", m2)

            #saat karşılaştırma işlemleri
            listeclocks1 = list()
            data = databaseOperations.emptyorfull(db_conn)
            p = 0
            for i in data:
                if (i[0] == lastdate1 and i[1] == lastroom):
                    print("i[3]", i[2])
                    if (i[2] == None):
                        pass
                    else:
                        print("i deger", i)
                        listeclocks1 = i[2].split("-")
                        a1 = listeclocks1[0]
                        b1 = listeclocks1[1]
                        print("listeclocks[0]", listeclocks1[0])
                        print("listeclocks[1]", listeclocks1[1])

                        # veritabanındaki veriler
                        c1 = a1[0:2] + a1[3:5]
                        x1 = int(c1)
                        print("veritabanı saat baslangıc", x1)
                        d1 = b1[0:2] + b1[3:5]
                        y1= int(d1)
                        print("veritabanı saat bitiş", y1)
                        if not ((m1 < x1 and m2 <= x1) or (m1 >= y1 and m2 > y1)):
                            p = 1

                        else:
                            pass
                else:
                    pass

            if (p == 0):
                if (m2 > m1):
                    databaseOperations.adddateRecord(db_conn, username, "", "", timeresult1)
                    response_Interactive_Message(responseurl,"End time:" + selectedValue + " \n Clock selected to:" + timeresult1)
                else:
                    response_Interactive_Message(responseurl, "*Select an end time greater than the start time*.\nPlease call '/meeting' again and select a new one.")
                    databaseOperations.deletemeetinglastrow(db_conn)
            else:
                response_Interactive_Message(responseurl,"*Clock selected to: " + timeresult1 + " but \n *This room is full on dates*. Please call '/meeting' again and select a new one.")
                databaseOperations.deletemeetinglastrow(db_conn)





    return make_response(returnText, 200)

@app.route("/feedback-collector/slack/sendmeetingservey", methods=["POST"])
def sendMeetingservey(creater,username): #Toplantı odası için oluşturulan anketi gönderir.

   with app.app_context():

        sc = SlackClient(decryptToken())
        userinfo = getUserList()

        for key, val in userinfo.items():
            if key == username:

                #print("Key : "+ key+"Username : "+username)
                #print("userinfo[key] : "+userinfo[key])

                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.calendar())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.meeting_room())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.clocks())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.clocks1())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.persons())



            else:
                pass

        return make_response("", 200)

#----
@app.route("/feedback-collector/slack/sendbikingservey",methods=["POST"])
def sendBikingservey(creater,username):

    with app.app_context():

        sc=SlackClient(decryptToken())
        userinfo=getUserList()

        for key, val in userinfo.items():
            if key == username:
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.calendarforbike())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.biking())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.clocksforbike())
                sc.api_call("chat.postMessage", channel=userinfo[key], blocks=slackMessages.clocksforbike1())

            else:
                pass

        return make_response("", 200)


@app.route("/feedback-collector/slack/slash", methods=["POST"])
def collectSlashRequests(): #Bu commandler çağrıldığında hangi fonksiyonlara gidecek

    username=request.form["user_name"]
    command=request.form["command"]

    print(username + "  " + command)

    if(command == "/biking"):

        sendBikingservey("Manuel",username)
        return make_response("",200)

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
def setSchedule(minuteSlash): #Zamanlayıcı oluşturu, hava durumu anketini 15 dakikada bir gönderir.

    minute_servey = request.form.get("minute_servey")
    print("schedule setted "+str(minute_servey)+ " minute_servey")
    scheduler.add_job(id="surveyschedule", func=sendAirSurvey, args=("Auto",) ,trigger="interval", seconds=int(minuteSlash)*60*15) #15 dakika
    print("schedule added")

    return make_response("Success",200)


@app.route('/feedback-collector/slack/removeSchedule', methods=["POST"])
def removeSchedule(): #Hava durumu anketi için oluşturulan zamanlayıcıyı durdurur.

    scheduler.remove_job("surveyschedule")
    print("Schedule removed")
    return make_response("Success",200)


@app.route('/feedback-collector/slack/setScheduleLocation', methods=["POST"])
def setScheduleLocation(minuteSlash): #Zamanlayıcı oluşturu, lokasyon anketini 15 dakikada bir gönderir.

    minute_location = request.form.get("minute_location")
    print("schedule setted "+str(minute_location)+ "minute")

    scheduler.add_job(id="checkackzone", func=checkAcZone, args=("Auto",), trigger="interval", seconds=int(minuteSlash) * 60 * 60 * 12) #12 saat
    scheduler.add_job(id="locationimageschedule", func=locationimage, args=("Auto",), trigger="interval",
                      seconds=int(minuteSlash) * 60)

    scheduler.add_job(id="locationschedule", func=sendLocationSurvey, args=("Auto",) ,trigger="interval", seconds=int(minuteSlash)*60)

    print("Location added")
    return make_response("Success",200)


@app.route('/feedback-collector/slack/removeScheduleLocation', methods=["POST"])
def removeScheduleLocation():#Lokasyon anketi için oluşturulan zamanlayıcıyı durdurur.

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
