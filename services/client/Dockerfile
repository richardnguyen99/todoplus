FROM node:latest

WORKDIR /usr/src/client/

COPY package*.json /usr/src/client/
RUN npm install

COPY . /usr/src/client/

CMD ["npm", "run", "start"]
