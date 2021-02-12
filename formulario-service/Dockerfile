#FROM node:latest
FROM node:latest

WORKDIR /app

ENV PORT=8080

#RUN npm install
RUN mkdir -p /app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . .

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]

#CD nodemon -L --watch . app.js
