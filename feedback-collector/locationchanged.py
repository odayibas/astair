from slackclient import SlackClient
import os
slack_token = os.environ["  "]
sc = SlackClient(slack_token)

sc.api_call(
"chat.postMessage",
  channel="UK5994WRZ",
  blocks= [
    
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
			"options": [
				{
					"text": {
						"type": "plain_text",
						"text": "Klima 1",
					},
					"value": "klima 1"
				},
				{
					"text": {
						"type": "plain_text",
						"text": "Klima 2",
					},
					"value": "klima 2"
				},
				{
					"text": {
						"type": "plain_text",
						"text": "Klima 3",
					},
					"value": "Klima 3"
				}
			]
		}
	}
	
  ]
  
)

