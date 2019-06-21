# Feedback Collector
TODO: write a brief description (input, output, function of the subsystem, deployment method, etc...)

**Description**

Feedback collector part of project handles collecting feedbacks from employees with Slack App. This slack app collects feedbacks by sending a direct message every user signed in to slack team. This direct message asks users how they feel the air condition and message contains three buttons(hot, good, cold) for interaction with users. This message can be driven by controller logic part of project. Rule-based model will decide when to send message to users and ask them how they feel. Most of the time controller logic send this message when average change of temperature reach significant amount. This message can be send manually and also can be scheduled by admin. Also information of which employee is affected by which air conditioner is gathered with another message. This message asks the users their location in office did changed. If changed then user chooses new air conditioner that affects him/her. 

**Input Parameters**

  - Slack API Token
  - Postgresql Database Connection Infos
  
**Output Parameters**

  - Slack Username
  - Slack UserID
  - Channel ID
  - Selected Answer
  - Timestamp of Selection
  - Survey ID
  
**Sending Message**

App takes Slack token for reaching API. With this token app can call APIs that has permission from slack app. Our app uses chat.postmessage api for sending message and users.list for gathering every singed in user's userid. App uses these userids for sending them direct messages with chat.postmessage api. Message is created in json format. Slack app sends every info about user's action with request to python app for interactivity.

**Deployment**

Python app deployed to Heroku server. 
TODO: Dockerised deployment

TODO: Installing slack app
TODO: How to use app
TODO: How to use input parameters
TODO: Add images
