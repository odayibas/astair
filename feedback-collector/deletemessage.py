from slackclient import SlackClient
import os
slack_token = "xoxp-651298496866-651315166883-655771284066-0fb4c72630119b11f9dd8afb8c150eeb"#os.environ["SLACK_API_TOKEN"]
sc = SlackClient(slack_token)
x=sc.api_call(
    "chat.delete",
    channel="UKGM6UD9T",
    ts="1561104675.000700"

)
print(x)