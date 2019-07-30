import numpy as np
import os
import time
import pickle
import random
from state_generator import TempModel


#  This module is heart of our Reinforcement Learning algorithm.
#

class QModel:

    def __init__(self):

        self.actions = [-2, -1, 0, 1, 2]    # A/C Actions

        self.temp_model = TempModel()       # SVM Model to determine the current state

        self.temp_map = None                # Previous vote results

        self.total_people = 8               # Total people in a zone. It must be given by argument. Not hardcoded. Fix it.

        # ------------------------------------ Q-Learning Variables

        self.epsilon = 1                    # Current epsilon value. Whether the action should be random or greedy.
        self.min_epsilon = 0.01             # Min epsilon values
        self.max_epsilon = 1                # Starting epsilon value.
        self.epsilon_decay = 0.99           # How much is epsilon going to be reduced at each step

        self.learning_rate = 0.1            # Learning rate
        self.discount = 0.8                 # Future reward discount in Bellman Equation.

        self.action_size = 5                # We have 5 actions
        self.state_size = 5                 # We have 5 states

        self.state = None                   # Previous state
        self.new_state = None               # Current state
        self.action = None                  # Previous action

        # ------------------------------- Loading Model and Epsilon

        self.Q = None                       # Q table which is our model itself.

        # If the model is trained before, load the epsilon, model, and previous vote results.

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

    # This method directly returns greedy action. If there is no experience, return random.
    def get_greedy_action(self, temp):
        state = self.get_state_from_temp(temp)
        if np.any(self.Q[state]):
            return self.actions[np.argmax(self.Q[state])]
        else:
            return self.actions[random.randint(0, self.action_size - 1)]

    # Determine the state by using SVM model.
    def get_state_from_temp(self, temp):
        return self.temp_model.get_state(temp)

    # Pick a random number. If that value is bigger than epsilon, go with greedy approach.
    # If not, pick random action.
    def get_action(self, state):
        if random.uniform(0, 1) > self.epsilon and np.any(self.Q[state]):
            # Random
            print("Greedy", end=" ")
            return np.argmax(self.Q[state])
        else:
            # Greedy
            print("Randomly", end=" ")
            return random.randint(0, self.action_size - 1)

    # Bellman Equation
    def train(self, state, new_state, reward, action):
        self.Q[state, action] = (1 - self.learning_rate) * self.Q[state, action] + self.learning_rate*(reward + self.discount*np.max(self.Q[new_state]))

    # def run(self):
    #
    #     for episode in range(self.total_episode):
    #         print("Episode =>", episode, " Epsilon ({})".format(self.epsilon))
    #
    #         print("State is ", self.state, end=" ")
    #         action = self.get_action(self.state)
    #         print("Action is ", self.actions[action])
    #
    #         new_state = self.get_choice()
    #         reward = self.get_reward(self.state, new_state)
    #
    #         self.train(self.state, new_state, reward, action)
    #         self.state = new_state
    #
    #         # epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-epsilon_decay * episode)
    #         self.epsilon *= self.epsilon_decay
    #
    #         with open("ac.pkl", 'wb') as f:
    #             pickle.dump(self.Q, f)
    #         with open("epsilon.pkl", "wb") as f:
    #             pickle.dump(self.epsilon, f)
    #
    #     print(self.Q)


    def update(self, reward):
        print("REWARD => ", reward)
        self.train(self.state, self.new_state, reward, self.action)     # Calculate bellman equation and update Q table

        self.epsilon *= self.epsilon_decay                              # Reduce epsilon

        with open("ac.pkl", 'wb') as f:                                 # Save model and epsilon
            pickle.dump(self.Q, f)
        with open("epsilon.pkl", "wb") as f:
            pickle.dump(self.epsilon, f)

        print(self.Q)

    def update_results(self, survey_data):                              # Save current vote results to use in the future
        for vote_id in range(3):
            for person in survey_data[vote_id]:
                self.temp_map[person] = vote_id

    def rule(self, s1, s2):                                             # This is our reward logic.
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

    def compare_people(self, survey_data):                              # Compare each person's previous and current
        print("Survey data: ", survey_data)                             # vote. Then find the total reward.
        print("Old Survey data: ", self.temp_map)
        print("compared")
        if self.temp_map is None:
            new_map = {}
            for vote_id in range(3):
                for person in survey_data[vote_id]:
                    new_map[person] = vote_id
            with open("temp_map.pkl", "wb") as f:
                pickle.dump(new_map, f)
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

    def forward(self, temp, survey_data):                           # Main method of this class. The outer class calls
        self.new_state = self.get_state_from_temp(temp)             # this method.

        print("State is {}.".format(self.new_state), end=" ")
        new_action = self.get_action(self.new_state)                # Get action according to the current state.
        print("Action is {}".format(self.actions[new_action]))
        print("Self_state => ", self.state)
        print("sSelf_action => ", )

        if self.state is not None and self.action is not None:
            print("INSIDE")
            self.update(self.compare_people(survey_data))           # Calculate reward and update Q-table by using
                                                                    # previous state and action.

        self.state = self.new_state                                 # Save current state and action to update Q-table
        self.action = new_action                                    # in the next time step.
        print("Epsilon value =>", self.epsilon)
        return self.actions[new_action]
