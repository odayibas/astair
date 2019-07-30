import gym
import numpy as np
import random
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam
import matplotlib.pyplot as plt
from collections import deque


class DQN:
    def __init__(self):
        self.memory = deque(maxlen=2000)

        self.gamma = 0.85
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.95
        self.learning_rate = 0.01
        self.tau = .125

        self.model = self.create_model()
        self.target_model = self.create_model()

    def create_model(self):
        model = Sequential()
        # state_shape = self.env.observation_space.shape
        model.add(Dense(6, input_dim=3, activation="relu"))
        model.add(Dense(12, activation="relu"))
        model.add(Dense(6, activation="relu"))
        model.add(Dense(3))
        model.compile(loss="mean_squared_error",
                      optimizer=Adam(lr=self.learning_rate))
        return model

    def act(self, state):
        self.epsilon *= self.epsilon_decay
        self.epsilon = max(self.epsilon_min, self.epsilon)

        print("***STATUS***")
        prediction = self.model.predict(state)[0]
        print("* {} | {} | {} *".format(prediction[0], prediction[1], prediction[2]))
        print("************")

        if np.random.random() < self.epsilon:
            print("*Randomly")
            return random.randint(0, 2)
        print("*Greedy")
        return np.argmax(self.model.predict(state)[0]) # fix it

    def remember(self, state, action, reward, new_state):
        self.memory.append([state, action, reward, new_state])

    def replay(self):
        batch_size = 8
        # batch_size = 32
        if len(self.memory) < batch_size:
            return

        samples = random.sample(self.memory, batch_size)
        for sample in samples:
            state, action, reward, new_state = sample
            target = self.target_model.predict(state)
            Q_future = max(self.target_model.predict(new_state)[0])
            target[0][action] = reward + Q_future * self.gamma
            self.model.fit(state, target, epochs=1, verbose=0)

    def target_train(self):
        weights = self.model.get_weights()
        target_weights = self.target_model.get_weights()
        for i in range(len(target_weights)):
            target_weights[i] = weights[i] * self.tau + target_weights[i] * (1 - self.tau)
        self.target_model.set_weights(target_weights)

    def save_model(self, fn):
        self.model.save(fn)

def decode(str):
    lst = str.split(",")
    result = np.zeros(3)
    for i in range(len(lst)):
        result[i] = int(lst[i])
    result = result.reshape(1, len(lst))
    return result


def main():

    acts = ["decrease", "stable", "increase"]

    trials = 10

    dqn_agent = DQN()

    steps = []

    cur_state = np.array([10, 10, 10])
    cur_state = cur_state.reshape(1, 3)

    for episode in range(trials):
        print("# EPISODE {} #".format(episode))
        action = dqn_agent.act(cur_state)
        print("Action is => ", acts[action])
        raw_state = input("Enter new state (C,G,H): ")
        new_state = decode(raw_state)
        reward = new_state[0][1] - cur_state[0][1]
        dqn_agent.remember(cur_state, action, reward, new_state)
        dqn_agent.replay()  # internally iterates default (prediction) model
        dqn_agent.target_train()
        steps.append(reward)
        cur_state = new_state

    plt.plot(steps, 'ro')
    plt.show()

if __name__ == "__main__":
    main()
