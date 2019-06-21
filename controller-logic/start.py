import schedule
import time
import modelDecision

def work():
    modelDecision.decisionModel()

# After every 10mins work() is called.
schedule.every(1).minutes.do(work)
while True:
    schedule.run_pending()
    time.sleep(1)
