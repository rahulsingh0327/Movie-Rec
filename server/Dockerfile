FROM node:18-alpine

# Required for better-sqlite3 to compile
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create data folder for SQLite
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "index.js"]