FROM node
WORKDIR /usr/app
COPY app/web/back/ /usr/app/
RUN  npm install pg
RUN npm install express
RUN npm i body-parser
RUN npm install nodemon -g

CMD ["node", "server.js"]
