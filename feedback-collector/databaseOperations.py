from __future__ import print_function
import sys
import psycopg2
import os
from datetime import datetime
def connect_db():
    return psycopg2.connect(os.environ.get('POSTGRESQL_URL'))

def addVoteRecord(connection,username,vote):
    userid=isUserExist(connection,username,"PersonalInfo")
    if not(userid):
        return False
    userid=userid[0]
    userid=userid[0]
    cursor = connection.cursor()
    voteid=int(getLastSurveyID(connection))
    postgres_insert_query = """ INSERT INTO weatherpoll (user_id, vote, vote_id, data_time) VALUES (%s,%s,%s,%s)"""
    record_to_insert = (userid,vote,voteid   ,datetime.now())
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
    print(ids)
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
    if(isUserExist(connection,username,"slack_temp")):
        return "You have already sent command."
    cursor = connection.cursor()
    postgres_insert_query="""Insert into slack_temp (username,loc,comment)VALUES (%s,%s,%s)"""
    record_to_insert = (username,location,command)
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()
    cursor.close()
    return "We will take care of it."

def checkSlashData(connection):
    cursor=connection.cursor()
    postgres_select_query=""" Select * from slack_temp"""
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
                #bildirim at
        if(command=="hot"):
            arr[loc][0]+=1
            if(arr[loc][0]>2):
                deleteSlashCommands(connection,loc+1,command)
                arr[loc][0]=0
                #bildirim at
        
    print(arr)

def deleteSlashCommands(connection,location,command):
    location = str(location)
    cursor=connection.cursor()
    postgres_delete_query="delete from slack_temp where loc="+location+" AND comment='"+command+"'"
    cursor.execute(postgres_delete_query)
    connection.commit()
    print(command +" commands at" +location + " are deleted")
    cursor.close()

def deleteAllSlashCommnads(connection):
    cursor=connection.cursor()
    postgres_delete_query="delete from slack_temp"
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
    postgres_select_query="SELECT token FROM systemadmin order by id desc LIMIT 1"
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
        
