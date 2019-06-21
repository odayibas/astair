import os
#import psycopg2
from flask import Flask, render_template, g, request, make_response, Response
import json
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'XYZ')


#def connect_db():
#    return psycopg2.connect(os.environ.get('DATABASE_URL'))


#@app.before_request
#def before_request():
 #   g.db_conn = connect_db()


@app.route('/')
def index():
    #cur = g.db_conn.cursor()
    #cur.execute("SELECT * FROM country;")
    #return render_template('index.html', countries=cur.fetchall())
    return "App for Slack results (Services)"

@app.route("/slack/returns", methods=["POST"])
def message_actions():
    
    form_json = json.loads(request.form["payload"])
    print(form_json)
    user = form_json["user"]
    username = user["username"]
    userid= user["id"]
    if "accessory" not in request.form["payload"]:
        
        choosen= form_json["actions"]
        choosen= choosen[0]
        choosen = choosen["value"]
        
        print(user)
        print(choosen)
        return make_response(username +"  "+choosen,200)
    else:
        actions=form_json["actions"]
        actions=actions[0]
        selectedoption=actions["selected_option"]
        selectedValue=selectedoption["value"] 
        print(user)
        print(selectedValue)
        return make_response(username +"  "+selectedValue,200)

    
 
    
    
