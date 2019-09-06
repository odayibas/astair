from __future__ import print_function
import sys
import psycopg2
import os
from datetime import datetime

def connect_db():
    return psycopg2.connect(os.environ.get('POSTGRESQL_URL'))




def emptyorfull(connection):

    cursor = connection.cursor()
    postgres_select_query = """ select selected_date,selected_room,selected_clock from meeting group by selected_date,selected_room,selected_clock"""
    cursor.execute(postgres_select_query)
    data = cursor.fetchall()
    cursor.close()

    print("empyorfuldatası",data)

    return data

def saat(connection):

    cursor = connection.cursor()
    postgres_select_query = """select saat from clocks order by id asc"""
    cursor.execute(postgres_select_query)
    saat1 = cursor.fetchall()
    cursor.close()

    return saat1

def emptyorfullbiking(connection): #bike tablosundaki veirleri getirir.

    cursor = connection.cursor()
    postgres_select_query=""" select selected_date,selected_bike,selected_clock from biking group by selected_Date,selected_bike,selected_clock """
    cursor.execute(postgres_select_query)

    data=cursor.fetchall()
    cursor.close()

    return data

def lastdateforbiking(connection):
    cursor= connection.cursor()
    postgres_select_query="""select selected_date from biking where id = (select max(id) from biking)"""
    cursor.execute(postgres_select_query)
    data=cursor.fetchall()
    cursor.close()

    return  data
def lastbikeforbiking(connection):
    cursor= connection.cursor()
    postgres_select_query="""select selected_bike from biking where id = (select max(id) from biking)"""
    cursor.execute(postgres_select_query)
    data=cursor.fetchall()
    cursor.close()

    return  data
def lastmeetformeeting(connection):
    cursor= connection.cursor()
    postgres_select_query="""select selected_room from meeting where id = (select max(id) from meeting)"""
    cursor.execute(postgres_select_query)
    data=cursor.fetchall()
    cursor.close()

    return  data


def lastdateformeeting(connection):
    cursor = connection.cursor()
    postgres_select_query = """select selected_date from meeting where id = (select max(id) from meeting)"""
    cursor.execute(postgres_select_query)
    data = cursor.fetchall()
    cursor.close()

    return data
def taketimes(connection):

    cursor=connection.cursor()
    postgres_select_query="""select saat from temporaryinterface where id = (select max(id) from temporaryinterface)"""
    cursor.execute(postgres_select_query)
    data=cursor.fetchall()
    cursor.close()

    return  data

def addtemporarytimes(connection,date):

    cursor=connection.cursor()
    postgres_insert_query = """ INSERT INTO temporaryinterface (saat) VALUES (%s)"""
    data = (date)
    print("data", data)
    cursor.execute(postgres_insert_query,[data])
    connection.commit()
    cursor.close()




def adddateRecordbiking(connection,username,date,bike,clock): #Biking tablosunu günceller

    cursor=connection.cursor()

    if(date!=""):

        postgres_insert_query= """ INSERT INTO biking (username,selected_date) VALUES (%s,%s)"""
        cursor.execute(postgres_insert_query,(str(username),str(date)))
        connection.commit()
        cursor.close()

    if(bike!=""):

        postgres_select_query = """ select username,max(vote_id) from biking where username=%s group by username"""
        data = (str(username))
        cursor.execute(postgres_select_query,[data])
        columns=cursor.fetchall()

        username_voteid = columns[0][0]
        vote_id = columns[0][1]

        postgres_update_query=""" update biking set selected_bike = %s where username= %s and username = %s and vote_id=%s"""
        cursor.execute(postgres_update_query,(str(bike),str(username),str(username_voteid),str(vote_id)))
        connection.commit()
        cursor.close()

    if (clock != ""):
        postgres_select_query = """select username,max(vote_id) from biking where username=%s group by username"""
        data = (str(username))
        cursor.execute(postgres_select_query, [data])
        columns = cursor.fetchall()

        username_voteid = columns[0][0]
        vote_id = columns[0][1]

        postgres_update_query = """ update biking set selected_clock=%s where username = %s and username = %s and vote_id=%s"""
        cursor.execute(postgres_update_query, (str(clock), str(username), str(username_voteid), str(vote_id)))
        connection.commit()
        cursor.close()

    return True

def controlbiking(connection): #bike tablosundaki verileri bir liste2 'ye atar.

    liste = list()

    cursor = connection.cursor()
    postgres_select_query = """ select id,username,selected_date,selected_bike,selected_clock from biking group by id, username,selected_date,selected_bike,selected_clock order by id asc"""
    cursor.execute(postgres_select_query)
    data = cursor.fetchall()
    liste.append(data)
    cursor.close()

    liste2 = list()

    for i in liste:
        for j in i:
            liste2.append(j)

    return liste2

def deletebiking(connection,username,date,bike,clock): # bike tablosundaki veriyi siler

    print(username,date,bike,clock)
    cursor = connection.cursor()
    postgres_delete_query = """ Delete from biking where username=%s and selected_date=%s and selected_bike=%s and selected_clock=%s"""
    data = (username,date,bike,clock)
    cursor.execute(postgres_delete_query,data)
    connection.commit()

    cursor.close()
def deletebikinglastrow(connection):
    cursor=connection.cursor()
    postgres_delete_query="""Delete from biking where id = (select max(id) from biking)"""
    cursor.execute(postgres_delete_query)
    connection.commit()

    cursor.close()


def deletemeetinglastrow(connection):
    cursor=connection.cursor()
    postgres_delete_query="""Delete from meeting where id = (select max(id) from meeting)"""
    cursor.execute(postgres_delete_query)
    connection.commit()
    cursor.close()
#Bike tablosu bitiş

def adddateRecord(connection,username,date,room,clock): #Meeting tablosunu günceller.

    cursor = connection.cursor()

    if(date!=""):

        postgres_insert_query = """ INSERT INTO meeting (username,selected_date) VALUES (%s,%s)"""
        cursor.execute(postgres_insert_query, (str(username),str(date)))
        connection.commit()
        cursor.close()

    if(room!=""):

        postgres_select_query = """select username,max(vote_id) from meeting where username=%s group by username"""
        data = (str(username))
        cursor.execute(postgres_select_query,[data])
        columns = cursor.fetchall()

        username_voteid = columns[0][0]
        vote_id = columns[0][1]

        postgres_update_query = """ update meeting set selected_room = %s where username = %s and username = %s and vote_id=%s"""
        cursor.execute(postgres_update_query,(str(room),str(username),str(username_voteid) ,str(vote_id)))
        connection.commit()
        cursor.close()

    if(clock!= ""):

        postgres_select_query = """select username,max(vote_id) from meeting where username=%s group by username"""
        data = (str(username))
        cursor.execute(postgres_select_query, [data])
        columns = cursor.fetchall()

        username_voteid = columns[0][0]
        vote_id = columns[0][1]

        postgres_update_query = """ update meeting set selected_clock=%s where username = %s and username = %s and vote_id=%s"""
        cursor.execute(postgres_update_query, (str(clock), str(username), str(username_voteid), str(vote_id)))
        connection.commit()
        cursor.close()

    return True


def control(connection):

    liste = list()

    cursor = connection.cursor()
    postgres_select_query = """ select id,username,selected_date,selected_room,selected_clock from meeting group by id, username,selected_date,selected_room,selected_clock order by id asc"""
    cursor.execute(postgres_select_query)
    data = cursor.fetchall()
    liste.append(data)
    cursor.close()

    liste2 = list()

    for i in liste:
        for j in i:
            liste2.append(j)

    return liste2

def deletemeeting(connection,username,date,room,clock):

    print(username,date,room,clock)
    cursor = connection.cursor()
    #print("silindi1")
    postgres_delete_query = """ Delete from meeting where username=%s and selected_date=%s and selected_room=%s and selected_clock=%s"""
    #print("silindi2")
    data = (username,date,room,clock)
    cursor.execute(postgres_delete_query,data)
    connection.commit()
    #print("silindi3")
    cursor.close()

def addSnoozeTable(connection,username):

    print("username3: "+username)

    cursor = connection.cursor()
    postgres_insert_query = """insert into snooze (userid) values(%s)"""
    data = (username)
    cursor.execute(postgres_insert_query,[data])
    connection.commit()
    cursor.close()

def getSnoozeTableName(connection):

    cursor = connection.cursor()
    postgres_select_query = """ select userid from snooze"""
    cursor.execute(postgres_select_query)
    name = cursor.fetchall()
    cursor.close()

    print(name)

    return name

def deleteSnoozeTableName(connection,username):

    cursor = connection.cursor()
    postgres_select_query = """ Delete from snooze where userid=%s"""
    data = (username)
    cursor.execute(postgres_select_query,[data])
    cursor.close()


def getName(connection):

    cursor = connection.cursor()
    postgres_select_query = """ select distinct(personalinfo.username) from personalinfo inner join weatherpoll on weatherpoll.user_id=personalinfo.id and weatherpoll.vote='Do not disturb' order by personalinfo.username asc"""
    cursor.execute(postgres_select_query)
    name = cursor.fetchall()
    cursor.close()

    return name


def getPersonalinfo(connection):

    cursor = connection.cursor()
    postgres_select_query = """select username from personalinfo order by id asc"""
    cursor.execute(postgres_select_query)
    username = cursor.fetchall()
    cursor.close()

    return username

def deleteDisturb(connection):

    cursor = connection.cursor()
    postgres_select_query = """delete from snooze """
    cursor.execute(postgres_select_query)
    connection.commit()
    cursor.close()

def id(connection,username):

    cursor = connection.cursor()
    postgres_select_query = """ select id from personalinfo where username = '"""+str(username)+"'"
    cursor.execute(postgres_select_query)
    id2 = cursor.fetchall()
    cursor.close()

    #print("id2 : "+str(id2[0][0]))

    return id2[0][0]

def deleteDisturbwithCommand(connection,id):

    cursor = connection.cursor()
    postgres_delete_query = "delete from weatherpoll where user_id='"""+str(id)+"' AND vote='Do not disturb'"
    cursor.execute(postgres_delete_query)
    connection.commit()

    cursor.close()

def addVoteRecord(connection,username,vote):

    userid=isUserExist(connection,username,"PersonalInfo")

    if not(userid):
        return False

    userid=userid[0]
    userid=userid[0]
    cursor = connection.cursor()
    voteid=int(getLastSurveyID(connection))
    postgres_insert_query = """ INSERT INTO weatherpoll (user_id, vote, vote_id, data_time) VALUES (%s,%s,%s,%s)"""
    record_to_insert = (userid,vote,voteid,datetime.now())
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
    count = cursor.rowcount
    print (count, "Record inserted successfully into weatherpoll table")
    cursor.close()

    return True
    
def addLocationRecord(connection,username,location):

    cursor = connection.cursor()
    location=int(location)
    postgres_insert_query = """ INSERT INTO personalInfo (ac_id,username,birthday) VALUES (%s,%s,%s)"""
    postgres_update_query = """Update personalInfo set ac_id = %s where username = %s"""
    
    if(isUserExist(connection,username,"personalInfo")):
        
        cursor.execute(postgres_update_query, (location, username))
        connection.commit()
        
    else:
        
        print(type(location))
        record_to_insert = (location,username,datetime.now())
        cursor.execute(postgres_insert_query,record_to_insert)
        connection.commit()

    cursor.close()

    return True

def isUserExist(connection,username,dbTableName):

    cursor = connection.cursor()
    postgres_select_query=""" Select ID from """+dbTableName+""" where username = '"""+str(username)+"'"
    print(postgres_select_query)
    cursor.execute(postgres_select_query)
    person=cursor.fetchall()
    print(person)
    cursor.close()

    if person is None:
        return False

    else:
        return person


def getACzones(connection):

    ids=[]
    cursor=connection.cursor()
    postgres_select_query=""" select distinct ac_zone from zone order by ac_zone """
    cursor.execute(postgres_select_query)
    zones=cursor.fetchall()
    cursor.close()

    for zone in zones:
        ac_id = zone[0]
        ids.append(ac_id)

    #print(ids)

    return ids

def getPersonLocation(connection,username):

    cursor= connection.cursor()
    postgres_select_query=""" Select ac_id from personalInfo where username= '"""+str(username)+"'"
    cursor.execute(postgres_select_query)
    location=cursor.fetchone()
    cursor.close()

    if location!=None:
        return location[0]

    else:
        return False

def addSurvey(connection,author):

    cursor = connection.cursor()
    postgres_insert_query="""Insert into survey (creater,data_time) VALUES (%s,%s)"""
    record_to_insert = (author,datetime.now())
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
    cursor.close()

def addSlashData(connection,username,location,command):

    command=command[1:len(command)]

    if(isUserExist(connection,username,"slack_temp2")):
        return "You have already sent command."

    cursor = connection.cursor()
    postgres_insert_query="""Insert into slack_temp2 (username,loc,comment)VALUES (%s,%s,%s)"""
    record_to_insert = (username,location,command)
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
    cursor.close()

    return "We will take care of it."

def checkSlashData(connection):

    cursor=connection.cursor()
    postgres_select_query=""" Select * from slack_temp2"""
    cursor.execute(postgres_select_query)
    records=cursor.fetchall()
    cursor.close()
    zones = getACzones(connection)
    arr=[]

    for _ in range(len(zones)):
        arr.append([0,0])

    print(arr)

    for record in records:
        username = record[1]
        loc = int(record[2])
        command = record[3]
        loc -=1
        print(username+ " "+str(loc)+" "+command)

        if(command=="cold"):
            arr[loc][1]+=1
            print(arr)

            if(arr[loc][1]>2):
                deleteSlashCommands(connection,loc+1,command)
                arr[loc][1]=0

        if(command=="hot"):
            arr[loc][0]+=1

            if(arr[loc][0]>2):
                deleteSlashCommands(connection,loc+1,command)
                arr[loc][0]=0
        
    print(arr)

def deleteSlashCommands(connection,location,command):

    location = str(location)
    cursor=connection.cursor()
    postgres_delete_query="delete from slack_temp2 where loc="+location+" AND comment='"+command+"'"
    cursor.execute(postgres_delete_query)
    connection.commit()
    print(command +" commands at" +location + " are deleted")
    cursor.close()

def deleteAllSlashCommnads(connection):

    cursor=connection.cursor()
    postgres_delete_query="delete from slack_temp2"
    cursor.execute(postgres_delete_query)
    connection.commit()
    print("All commands are deleted")
    cursor.close()

def getLastSurveyID(connection):

    cursor=connection.cursor()
    postgres_select_query="SELECT id FROM survey ORDER BY data_time DESC LIMIT 1"
    cursor.execute(postgres_select_query)
    voteid=cursor.fetchone()
    voteid=voteid[0]

    print(voteid)

    return voteid

def getToken(connection):

    cursor=connection.cursor()
    postgres_select_query="SELECT token FROM systemadmin order by id ASC LIMIT 1"
    cursor.execute(postgres_select_query)
    token=cursor.fetchone()
    token=token[0]

    return token

def setToken(connection,token,username):

    cursor = connection.cursor()
    postgres_update_query = """Update systemadmin set token = %s where username = %s """
    cursor.execute(postgres_update_query,(token,username))
    connection.commit()
    cursor.close()

    return True
