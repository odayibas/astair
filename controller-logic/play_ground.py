# ---------------------------------------------- WORKING Q LEARNING
#
# import gym
# import random
# import numpy as np
# import os
# import time, pickle
#
# env = gym.make('Taxi-v2')
#
# total_episodes = 10000
# time_per_episode = 100
#
# epsilon = 1
# min_epsilon = 0.01
# max_epsilon = 1
# epsilon_decay = 0.01
# learning_rate = 0.1
# discount_rate = 0.99
#
# rewards = []
#
#
# Q = np.zeros((env.observation_space.n, env.action_space.n))
#
# def getAction(state):
#     # if random.uniform(0, 1) > epsilon:
#     if random.uniform(0, 1) > epsilon and not np.max(Q[state, :]) == 0:
#         return np.argmax(Q[state, :])
#     else:
#         return env.action_space.sample()
#
#
# for episode in range(total_episodes):
#     state = env.reset()
#
#     done = False
#     found = False
#
#     episode_reward = 0
#     for i in range(time_per_episode):
#
#         # env.render()
#
#         action = getAction(state)
#
#         new_state, reward, done, info = env.step(action)
#
#         Q[state, action] = (1 - learning_rate)*Q[state, action] + learning_rate*(reward + discount_rate*np.max(Q[new_state, :]))
#
#         episode_reward += reward
#
#         if reward == 20:
#             found = True
#             rewards.append(1)
#
#         state = new_state
#
#         # os.system('clear')
#
#         if done:
#             break
#     if not found:
#         rewards.append(0)
#
#     print("Episode =>", episode, end="\r", flush=True)
#     # rewards.append(episode_reward)
#
#     epsilon = min_epsilon + (max_epsilon - min_epsilon) * np.exp(-epsilon_decay * episode)
#
# print(Q)
#
# # with open("taxi.pkl", 'wb') as f:
# #     pickle.dump(Q, f)
#
# results = np.split(np.array(rewards), total_episodes / 1000)
# count = 1000
#
# for r in results:
#     print(count, " : ", str(sum(r/1000)))
#     count += 1000

# --------------------------------------------------------------

import gym
import numpy as np
import time
import pickle, os

env = gym.make('Taxi-v2')

with open("taxi.pkl", 'rb') as f:
    Q = pickle.load(f)


def choose_action(state):
    action = np.argmax(Q[state, :])
    return action


# start
for episode in range(5):

    state = env.reset()
    print("*** Episode: ", episode)
    t = 0
    while t < 100:
        env.render()

        action = choose_action(state)

        state2, reward, done, info = env.step(action)

        state = state2

        if done:
            break

        time.sleep(0.5)
        os.system('clear')