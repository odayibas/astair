from flask import Flask, render_template, g, request, make_response, Response
import json
import databaseOperations

db_conn = databaseOperations.connect_db()

def getAirConSurvey():

    aircondition=[{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "How is the weather condition, how do you feel?"
      }
    },
    {
      "type": "section",
      "block_id": "section567",
      "text": {
        "type": "mrkdwn",
        "text": "Choose best option for you"
      }
      
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Hot",
            
            },
            "value":"Sicak"
            
        },
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Nice",
            
            },
            "value":"Guzel"
        },
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Cold",
            
            },
            "value":"Soguk"
        },
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Not in office",
            
            },
            "value":"Ofiste Degilim"
        }
      ]
    }]
    return aircondition

def checkAcZone():

    currentZone = [{
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "You can see your AC zone which you are assigned"
        }
    },
        {
            "type": "section",
            "block_id": "section567",
            "text": {
                "type": "mrkdwn",
                "text": "Click to see your current zone"
            }

        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click",

                    },
                    "value": "zone"

                }
            ]
        }]
    return currentZone


def getLocationSurvey(ids):
    """
    username=request.form["user_name"]  # her kullanici icin username cekmeli, bu yanlis location anketini kim atyiysa onun ac_idsini gosteriyor
    location = databaseOperations.getPersonLocation(db_conn,username)
    message_location = ""
    if location == False:
        message_location = "Your location has not been set before"
    else:
        message_location = "Your current location is " + str(location)
    """
    options=[]
    for i in ids:
        options.append({
                        "text": {
                            "type": "plain_text",
                            "text": "Klima "+str(i),
                        },
                        "value": str(i)
                    })
    options.append({
                    "text": {
                        "type": "plain_text",
                        "text": "Degismedi",
                    },
                    "value": "degismedi"
                })
    locationChanged= [
    {   "type": "section",
        "text": {
            "type": "mrkdwn",
                      #"text": message_location + "\nPick an item from the dropdown list"
            "text": "Pick an item from the dropdown list"
        },
        "accessory": {
            "type": "static_select",
            "placeholder": {
                "type": "plain_text",
                "text": "Select an item",
            },
            "options": options
        }
    }
    ]
    return locationChanged
