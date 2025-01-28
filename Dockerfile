FROM node

COPY . /app/

WORKDIR /app

RUN npm install

CMD ["nodemon", "app.js"]