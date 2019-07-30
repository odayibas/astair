import numpy as np
import os
import time
import pickle
import random
from state_generator import TempModel

class QModel:

    def __init__(self):

        self.reward_table = [[-1, 1, -2],
                             [-1, 1, -1],
                             [-2, 1, -1]]

        self.actions = [-2, -1, 0, 1, 2]

        self.temp_model = TempModel()

        self.temp_map = None

        self.total_people = 8

        # ------------------------------------ Q-Learning Variables

        self.epsilon = 1
        self.min_epsilon = 0.01
        self.max_epsilon = 1
        self.epsilon_decay = 0.99

        self.learning_rate = 0.1
        self.discount = 0.8

        self.action_size = 5
        self.state_size = 5

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

        try:
            with open("temp_map.pkl", "rb") as f:
                self.temp_map = pickle.load(f)
                print(self.temp_map)
            print("Temp_map loaded")
        except FileNotFoundError:
            print("No previous temp map")

        print("Model is ready.")

        # ---------------------------------------------------------

    def get_greedy_action(self, temp):
        state = self.get_state_from_temp(temp)
        if np.any(self.Q[state]):
            return self.actions[np.argmax(self.Q[state])]
        else:
            return self.actions[random.randint(0, self.action_size - 1)]

    def get_state_from_temp(self, temp):
        return self.temp_model.get_state(temp)

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
        if random.uniform(0, 1) > self.epsilon and np.any(self.Q[state]):
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
            self.epsilon *= self.epsilon_decay

            with open("ac.pkl", 'wb') as f:
                pickle.dump(self.Q, f)
            with open("epsilon.pkl", "wb") as f:
                pickle.dump(self.epsilon, f)

        print(self.Q)

    def update(self, reward):
        print("REWARD => ", reward)
        self.train(self.state, self.new_state, reward, self.action)

        self.epsilon -= self.epsilon_decay

        with open("ac.pkl", 'wb') as f:
            pickle.dump(self.Q, f)
        with open("epsilon.pkl", "wb") as f:
            pickle.dump(self.epsilon, f)

        print(self.Q)

    def update_results(self, survey_data):
        for vote_id in range(3):
            for person in survey_data[vote_id]:
                self.temp_map[person] = vote_id

    def rule(self, s1, s2):
        if s1 == s2:
            return 0
        elif s1 == 0 and s2 == 1:
            return 1
        elif s1 == 0 and s2 == 2:
            return -1
        elif s1 == 1 and (s2 == 0 or s2 == 2):
            return -1
        elif s1 == 2 and s2 == 0:
            return -1
        elif s1 == 2 and s2 == 1:
            return 1

    def compare_people(self, survey_data):
        print("Survey data: ", survey_data)
        print("Old Survey data: ", self.temp_map)
        print("compared")
        if self.temp_map is None:
            new_map = {}
            for vote_id in range(3):
                for person in survey_data[vote_id]:
                    new_map[person] = vote_id
            with open("temp_map.pkl", "wb") as f:
                pickle.dump(new_map, f)
            print("yazildi")
            return 0

        new_map = {}
        for vote_id in range(3):
            for person in survey_data[vote_id]:
                new_map[person] = vote_id

        result = 0

        for key in self.temp_map:
            if key in new_map:
                # Compare
                result += self.rule(self.temp_map[key], new_map[key])

        self.temp_map = new_map

        with open("temp_map.pkl", "wb") as f:
            pickle.dump(self.temp_map, f)

        return result / self.total_people

    def forward(self, temp, survey_data):

        self.new_state = self.get_state_from_temp(temp)

        print("State is {}.".format(self.new_state), end=" ")
        new_action = self.get_action(self.new_state)
        print("Action is {}".format(self.actions[new_action]))

        print("Self_state => ", self.state)
        print("sSelf_action => ", )

        if self.state is not None and self.action is not None:
            print("INSIDE")
            self.update(self.compare_people(survey_data))

        self.state = self.new_state
        self.action = new_action
        print("Epsilon value =>", self.epsilon)
        return self.actions[new_action]
