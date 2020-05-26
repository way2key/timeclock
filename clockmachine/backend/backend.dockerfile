#### Stage 0, Build API
FROM node:alpine
LABEL author="Olivier D'Ancona"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","server.js"]
