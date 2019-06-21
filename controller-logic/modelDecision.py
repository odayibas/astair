import pmvModel
import voteBasedModel

def receiveTempParameters():
    pass

def receiveVoteParameters():
    pass

def receivePMVParameters():
    pass

def decisionModel():
    #receiveTempParameters()
    airTemp = 27
    newMeanTemp = 26
    oldMeanTemp = 23.5
    
    if(abs(newMeanTemp - oldMeanTemp) < 2):
        #receivePMVParameters()
        velocity = 0.2
        rh = 60
        met = 1.2
        clo = 0.3
        pmv, ppd = pmvModel.pmv(airTemp,newMeanTemp, velocity, rh, met, clo)
        #pmvModel.display(pmv, ppd, airTemp)
        #pmvModel.writeFile(pmv, ppd, airTemp)
    else:
        #receiveVoteParameters()
        hotValues = 30
        coldValues = 10
        goodValues = 15
        degree = voteBasedModel.voteBaseModel(hotValues, goodValues, coldValues, airTemp)
        #voteBasedModel.display(degree)
        #voteBasedModel.writeFile(degree)
