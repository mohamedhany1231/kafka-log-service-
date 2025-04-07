FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY   . .

ENV PORT=3000

EXPOSE 3000
EXPOSE 27017

CMD [ "npm" , "start" ]

