FROM node:8

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

RUN npm run seed

CMD ["npm", "start"]
