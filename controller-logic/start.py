import schedule
import time
import modelDecision

def work():
    modelDecision.decisionModel()

# Task scheduling 
# After every 10mins geeks() is called.
schedule.every(1).minutes.do(work)
while True:
    schedule.run_pending()
    time.sleep(1)
