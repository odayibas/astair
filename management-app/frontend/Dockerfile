# base image
FROM node:10.16

# set working directory
WORKDIR /astair

# add `/astair/node_modules/.bin` to $PATH
# ENV PATH /astair/node_modules/.bin:$PATH^

# install and cache app dependencies
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]

