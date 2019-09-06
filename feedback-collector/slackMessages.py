from flask import Flask, render_template, g, request, make_response, Response
import json
import databaseOperations
import datetime

db_conn = databaseOperations.connect_db()



def clocks():

    tüm_saatler = databaseOperations.saat(db_conn)

    clocks = []

    for i in range(0,32):

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
            "action_id": "clock_id1",
            "placeholder": {
                "type": "plain_text",
                "text": "Start time",
            },
            "options": clocks
        }
    }]

    return clock


def clocks1():

    tüm_saatler = databaseOperations.saat(db_conn)

    clocks = []

    for i in range(0,32):

        clocks.append({
            "text": {
                "type": "plain_text",
                "text": tüm_saatler[i][0],
            },
            "value":  tüm_saatler[i][0]
        })

    clock1 = [{

        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Pick a clock from the dropdown list"
        },

        "accessory": {
            "type": "static_select",
            "action_id": "clock_id2",
            "placeholder": {
                "type": "plain_text",
                "text": "End time",
            },
            "options": clocks
        }
    }]

    return clock1
def clocksforbike():

    tüm_saatler = databaseOperations.saat(db_conn)

    clocks = []

    for i in range(0,32):

        clocks.append({
            "text": {
                "type": "plain_text",
                "text": tüm_saatler[i][0],
            },
            "value":  tüm_saatler[i][0]
        })

    clocksforbike = [{

        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Pick a clock from the dropdown list"
        },

        "accessory": {
            "type": "static_select",
            "action_id": "clock_id3",
            "placeholder": {
                "type": "plain_text",
                "text": "Start Time",
            },
            "options": clocks
        }
    }]

    return clocksforbike

def clocksforbike1():

    tüm_saatler = databaseOperations.saat(db_conn)

    clocks = []

    for i in range(0,32):

        clocks.append({
            "text": {
                "type": "plain_text",
                "text": tüm_saatler[i][0],
            },
            "value":  tüm_saatler[i][0]
        })

    clocksforbike1 = [{

        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Pick a clock from the dropdown list"
        },

        "accessory": {
            "type": "static_select",
            "action_id": "clock_id4",
            "placeholder": {
                "type": "plain_text",
                "text": "End Time",
            },
            "options": clocks
        }
    }]

    return clocksforbike1
def howmanytimes():
    howmanytimes= [

            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "how many times "
                },
                "accessory": {
                    "type": "static_select",
                    "action_id": "howmanytimes",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                    "emoji": True

                    },

                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1",
                    "emoji": True

                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2",
                    "emoji": True
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "3",
                    "emoji": True
                            },
                            "value": "3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "4",
                    "emoji": True
                            },
                            "value": "4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "5",
                    "emoji": True
                            },
                            "value": "5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "6",
                    "emoji": True
                            },
                            "value": "6"
                        }
                    ]
                }

            }

        ]
    return howmanytimes
def howmanytimesMeeting():
    howmanytimesMeeting= [

            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "how many times "
                },
                "accessory": {
                    "type": "static_select",
                    "action_id": "howmanytimesMeeting",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                    "emoji": True

                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1",
                    "emoji": True

                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2",
                    "emoji": True
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "3",
                    "emoji": True
                            },
                            "value": "3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "4",
                    "emoji": True
                            },
                            "value": "4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "5",
                    "emoji": True
                            },
                            "value": "5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "6",
                    "emoji": True
                            },
                            "value": "6"
                        }
                    ]
                }

            }

        ]
    return howmanytimesMeeting


#Mesaj Bloğu
def biking():
    biking= [

            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Pick an biking  from the dropdown list."
                },
                "accessory": {
                    "type": "static_select",
                    "action_id": "staticselectbike",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                    "emoji": True

                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bike 1",
                    "emoji": True

                            },
                            "value": "Bike 1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bike 2",
                    "emoji": True
                            },
                            "value": "Bike 2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bike 3",
                    "emoji": True
                            },
                            "value": "Bike 3"
                        }
                    ]
                }

            }

        ]
    return biking

def calendarforbike():

    an = datetime.datetime.now()

    calendar = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Pick a date for biking."
            },
            "accessory": {
                "type": "datepicker",
                "action_id": "datepickerbike",
                "initial_date": datetime.datetime.strftime(an, '%Y-%m-%d'),
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a bike",
                    "emoji": True
                }

            }
        }

    ]

    return  calendar

def inputarea1():

    inputarea1 = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Attendees"
            },
            "accessory": {
                "type": "users_select",
                "action_id":"users_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select a user",
                    "emoji": True
                }




            }
        }
    ]

    return inputarea1
def inputarea():

    inputarea= [
	{
		"type": "context",
		"elements": [
			{
				"type": "mrkdwn",
				"text": "Attendees"
			}
		]
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "users_select",
                "action_id": "inputarea_id",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a user"

				}
			}
		]
	}

]
    return inputarea
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
                "action_id": "datepickerroom",
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
                "action_id":"static_selectroom",
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
            "action_id": "location1",
            "placeholder": {
                "type": "plain_text",
                "text": "Select an item",
            },
            "options": options
        }
    }]

    return locationChanged