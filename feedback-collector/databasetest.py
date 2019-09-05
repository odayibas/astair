import testintesti
from slackclient import SlackClient
import slackMessages
from datetime import datetime

slack_token ="xoxp-682988836772-697728528790-705347410516-80e87b69040a3b98fa18e26baec4a5ae"

sc = SlackClient(slack_token)

def getUserList():

    usersID=sc.api_call("users.list")
    userinfo={}
    members=usersID["members"]

    for i in range(len(members)):

        useri=members[i]
        userinfo[useri["name"]]=useri["id"]

    return userinfo

def sendLocationSurveyOneUser(username,count):

    userinfo = getUserList()
    userid=userinfo.get(username)
    sc.api_call("chat.postMessage", channel=userid,blocks=slackMessages.getLocationSurvey(count))

def sendAirSurveyOneUser(username):

    userinfo = getUserList()
    userid=userinfo.get(username)
    sc.api_call("chat.postMessage",channel=userid,blocks=slackMessages.getAirConSurvey())
    testintesti.addSurvey(db_conn,"Auto")

db_conn = testintesti.connect_db()
testintesti.checkSlashData(db_conn)

