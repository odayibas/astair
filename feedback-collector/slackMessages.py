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
  locationChanged= [
    
    {   "type": "section",
		"text": {
			"type": "mrkdwn",
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
