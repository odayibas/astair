import numpy as np
import os
import time
import pickle
import random


class QModel:

    def __init__(self):

        self.reward_table = [[-1, 1, -2],
                             [-1, 1, -1],
                             [-2, 1, -1]]

        self.actions = [-1, 0, 1]

        self.action_size = 3
        self.state_size = 3

        # ------------------------------------ Q-Learning Variables

        self.epsilon = 1
        self.min_epsilon = 0.01
        self.max_epsilon = 1
        self.epsilon_decay = 0.05

        self.learning_rate = 0.1
        self.discount = 0.8

        self.action_size = 3
        self.state_size = 3

        self.total_episode = 5

        self.state = None # MUST BE CHANGED
        self.new_state = None
        self.action = None

        # ------------------------------- Loading Model and Epsilon
        self.Q = None
        try:
            with open("ac.pkl", 'rb') as f:
                self.Q = pickle.load(f)
            print("Model loaded.")
            print(self.Q)
        except FileNotFoundError:
            self.Q = np.zeros((self.state_size, self.action_size))
            print("No previous data")

        try:
            with open("epsilon.pkl", "rb") as f:
                self.epsilon = pickle.load(f)
            print("Epsilon value updated => ", self.epsilon)
        except FileNotFoundError:
            print("No previous epsilon value")

        # ---------------------------------------------------------

    def get_state(self, cold, good, hot):
        print("Cold", cold, "Good", good, "Hot", hot)
        result = None
        total = cold + good + hot
        if good / total > 0.5:
            result = 1  # Good
        else:
            up = abs(hot - cold)
            down = hot + cold
            if (up / down) < 0.5:
                result = 1  # Good ? (At least optimum)
            else:
                if hot > cold:
                    result = 2  # hot
                else:
                    result = 0  # cold
        return result

    def get_reward(self, s1, s2):
        return self.reward_table[s1][s2]

    def get_action(self, state):
        if True or (random.uniform(0, 1) > self.epsilon and np.any(self.Q[state])):
            # Random
            print("Greedy", end=" ")
            return np.argmax(self.Q[state])
        else:
            # Greedy
            print("Randomly", end=" ")
            return random.randint(0, self.action_size - 1)

    def get_input(self):
        line = input("Enter votes (C,G,H): ")
        line = line.split(",")
        return line

    def get_choice(self):
        c = self.get_input()
        return self.get_state(int(c[0]), int(c[1]), int(c[2]))

    def train(self, state, new_state, reward, action):
        self.Q[state, action] = (1 - self.learning_rate) * self.Q[state, action] + self.learning_rate*(reward + self.discount*np.max(self.Q[new_state]))

    def run(self):

        for episode in range(self.total_episode):
            print("Episode =>", episode, " Epsilon ({})".format(self.epsilon))

            print("State is ", self.state, end=" ")
            action = self.get_action(self.state)
            print("Action is ", self.actions[action])

            new_state = self.get_choice()
            reward = self.get_reward(self.state, new_state)

            self.train(self.state, new_state, reward, action)
            self.state = new_state

            # epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-epsilon_decay * episode)
            self.epsilon -= self.epsilon_decay

            with open("ac.pkl", 'wb') as f:
                pickle.dump(self.Q, f)
            with open("epsilon.pkl", "wb") as f:
                pickle.dump(self.epsilon, f)

        print(self.Q)

    def update(self):
        reward = self.get_reward(self.state, self.new_state)
        self.train(self.state, self.new_state, reward, self.action)

        self.epsilon -= self.epsilon_decay

        with open("ac.pkl", 'wb') as f:
            pickle.dump(self.Q, f)
        with open("epsilon.pkl", "wb") as f:
            pickle.dump(self.epsilon, f)

        print(self.Q)

    def forward(self, cold, good, hot):

        self.new_state = self.get_state(cold, good, hot)

        print("State is {}.".format(self.new_state), end=" ")
        new_action = self.get_action(self.new_state)
        print("Action is {}".format(self.actions[new_action]))

        if self.state is not None and self.action is not None:
            self.update()

        self.state = self.new_state
        self.action = new_action

        return self.actions[new_action]
