from flask import Flask, render_template, g, request, make_response, Response
import json
import databaseOperations
import datetime

db_conn = databaseOperations.connect_db()

def clocks():

    tüm_saatler = databaseOperations.saat(db_conn)

    clocks = []

    for i in range(1,13):

        clocks.append({
            "text": {
                "type": "plain_text",
                "text": tüm_saatler[i][0],
            },
            "value":  tüm_saatler[i][0]
        })

    clock = [{

        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Pick a clock from the dropdown list"
        },

        "accessory": {
            "type": "static_select",
            "placeholder": {
                "type": "plain_text",
                "text": "Select a clock",
            },
            "options": clocks
        }
    }]

    return clock


def meeting_room():

    meeting_room = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Pick an meeting room from the dropdown list."
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": True
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Meeting room 1",
                            "emoji": True
                        },
                        "value": "Meeting room 1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Meeting room 2",
                            "emoji": True
                        },
                        "value": "Meeting room 2"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Meeting room 3",
                            "emoji": True
                        },
                        "value": "Meeting room 3"
                    }
                ]
            }
        }
    ]

    return meeting_room

def calendar():

    an = datetime.datetime.now()

    calendar = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Pick a date for meeting."
            },
            "accessory": {
                "type": "datepicker",
                "initial_date": datetime.datetime.strftime(an, '%Y-%m-%d'),
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a date",
                    "emoji": True
                }
            }
        }

    ]

    return  calendar

def onSnooze():

    on = [
	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": " You won't be able to see the polls.Use /snoozeoff to see surveys again.",
			"emoji": True
		}
	}
]
    return on


def offSnooze():

    off= [
	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": "You can now see the polls. Use /snoozeon if you don't want to see the polls again.",
			"emoji": True
		}
	}
]
    return off

def getAirConSurvey():

    aircondition = [{

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
        }
    ]

    return currentZone


def locationimage():

    location =[
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "You can see the air conditioner's communion. <https://raw.githubusercontent.com/odayibas/astair/master/management-app/frontend/public/assets/klima_konum.png|Click here to see the picture.>"
            }
        }
    ]
    return location

def getLocationSurvey(ids):

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

    locationChanged= [{

        "type": "section",
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
    }]

    return locationChanged