import sys
from datetime import datetime

"""
-Input Parameters:
Hot Vote, Good Vote, Cold Vote, A/C Degree
-Decision Module:
A/C Degree Range: 16C - 30C
Calculation max. vote for Hot and Cold:
(Hot)   +4   -> %90
        +3   -> %60
        +2   -> %40
        +1
         0
        -1
        -2   -> %40
        -3   -> %60
(cold)  -4   -> %90
"""

# This function calculates percent of vote and stores dictionary.
def calculatePercent(hotVote, goodVote, coldVote):
    totalVote = hotVote + goodVote + coldVote
    votes = {
        "HotResult" : hotVote/totalVote,
        "GoodResult" : goodVote/totalVote,
        "ColdResult" : coldVote/totalVote
    }
    return votes

# This function calculates how much increase or decrease for A/C degree.
def tempTable(percent):
    percent = 100 * percent
    if (percent < 40):
        degree = 1
    elif (percent >= 40 and percent < 60):
        degree = 2
    elif (percent >= 60 and percent < 90):
        degree = 3
    else:
        degree = 4
    return degree

# This function controls degree range for A/C.
def ACRangeControl(climateDegree):
    if(climateDegree < 16):
        climateDegree = 16
    elif(climateDegree > 30):
        climateDegree = 30
    return climateDegree

# This functions calculations degree.
def calculateDegree(votes, climateDegree):
    result = max(votes, key = votes.get)
    if(result == "GoodResult"):
        if(votes["HotResult"] > votes["ColdResult"]):
            climateDegree -= 1
        elif(votes["HotResult"] < votes["ColdResult"]):
            climateDegree += 1
    elif(result == "HotResult"):
        degree = tempTable(votes[result])
        climateDegree -= degree
    else:
        degree = tempTable(votes[result])
        climateDegree += degree
    return ACRangeControl(climateDegree)

# This function decide how calculation based by votes.
def decision(votes, climateDegree):
    if(votes["ColdResult"] == votes["HotResult"]):
        if(votes["ColdResult"] == votes["GoodResult"] or votes["ColdResult"] < votes["GoodResult"]):
            degree = climateDegree
        else:
            degree = climateDegree + 1 # or -1
    elif(votes["ColdResult"] == votes["GoodResult"]):
        if(votes["ColdResult"] < votes["HotResult"]):
            degree = climateDegree - 1
        else:
            degree = climateDegree + 1
    elif(votes["HotResult"] == votes["GoodResult"]):
        if(votes["HotResult"] > votes["ColdResult"]):
            degree = climateDegree - 1
        else:
            degree = climateDegree + 1
    else:
        degree = calculateDegree(votes, climateDegree)
    return degree

def display(degree):
    print(f'New A/C Degree: {degree}')

# This function calls all necessary functions and 
# calculates degree for A/C.
def voteBaseModel(hotVote, goodVote, coldVote, climateDegree):
    votes = calculatePercent(hotVote, goodVote, coldVote)
    degree = decision(votes, climateDegree)
    return degree

# This function is written temporarily until the database is installed.
def writeFile(degree):
    myFile = open('VoteModel.txt', 'a')
    myFile.write('\nAccessed on ' + str(datetime.now()) + " New A/C Degree: " + str(degree))

# Main function.
if __name__ == "__main__":
    if(len(sys.argv) != 5):
        print("Error")
        sys.exit(1)
    hotVote = int(sys.argv[1]) #10
    goodVote = int(sys.argv[2]) #10
    coldVote = int(sys.argv[3]) #10
    acDegree = int(sys.argv[4]) #20
    degree = voteBaseModel(hotVote, goodVote, coldVote, acDegree)
    #writeFile(degree)
