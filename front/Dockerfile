FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]