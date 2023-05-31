FROM node:18

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD ["npm", "start"]
