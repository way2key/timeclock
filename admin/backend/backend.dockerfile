#### Stage 0, Build admin API
FROM node:alpine
LABEL author="Olivier D'Ancona"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node","server.js"]

