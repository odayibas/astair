from slackclient import SlackClient
import os
slack_token = "xoxp-651298496866-651315166883-655771284066-0fb4c72630119b11f9dd8afb8c150eeb"#os.environ["SLACK_API_TOKEN"]
sc = SlackClient(slack_token)

sc.api_call(
  "chat.postMessage",
  channel="UK5994WRZ",
  blocks= [
    
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Hava durumu sizce nasil?"
      },
          "attachments": [
              {
      "type": "section",
      "block_id": "section567",
      "text": {
        "type": "mrkdwn",
        "text": "Size gore en uygun secenegi seciniz"
      }
      
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Sicak",
            
            },
            "value":"sicak"
            
        },
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Guzel",
            
            },
            "value":"guzel"
        },
        {
          "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Soguk",
            
            },
            "value":"soguk"
        }
      ]
    }
          
          ]

    }
    

	
  ]
  
)