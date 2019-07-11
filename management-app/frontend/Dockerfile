FROM node:10.16 as builder

WORKDIR /dependency

COPY package.json ./
RUN npm install

FROM node:10.16.0-alpine

WORKDIR /app

COPY . .
COPY --from=builder /dependency/ /app

EXPOSE 3000

CMD npm start
