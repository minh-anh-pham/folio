FROM node:18

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install react-scripts@3.4.1 -g

COPY . .

CMD ["npm", "start"]
