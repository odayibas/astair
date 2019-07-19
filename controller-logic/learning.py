from keras.layers import Dense
from keras.models import Sequential
import random
import numpy as np

table = [[0, 10, -1, -1],
         [-1, 10, -1, -1],
         [-1, 10, 0, 1],
         [-1, 10, 0, 0]]

def buildModel():
    model = Sequential()
    model.add(Dense(units=4, activation="relu", input_dim=4))
    model.add(Dense(units=2, activation="sigmoid"))
    model.compile(optimizer="adam", loss="mean_squared_error", metrics=['accuracy'])
    return model

def getQ(model, state):
    return model.predict(np.array([state]))[0]

def train (model, old_state, new_state, reward, action, discount):
    old_Q = getQ(model, old_state)
    next_Q = getQ(model, new_state)
    print("[INFO] PREDICTION =", next_Q)
    old_Q[action] = reward + discount * np.amax(next_Q)
    model.fit(x=np.array([old_state]), y=np.array([old_Q]), epochs=1)


def getGreedy(model, state):
    return np.argmax(getQ(model, state))

def getAction(model, state):
    if random.randint(1, 2) == 1:
        print("RANDOM")
        return random.randint(0, 1)
    else:
        print("GREEDY")
        return getGreedy(model, state)

def getReward(s1, s2):
    global table
    return table[s1][s2]

def one_hot(x):
    result = np.zeros(4)
    result[x-1] = 1
    return result

model = buildModel()

state = [0, 0, 1, 0]
new_state = None

while True:
    new_state = one_hot(int(input("Enter state = ")))
    action = getAction(model, state)
    train(model, state, new_state, getReward(np.argmax(state), np.argmax(new_state)), action, 0.8)
    print("ACTION", action)
    state = new_state
