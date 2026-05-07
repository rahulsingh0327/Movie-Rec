FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install ALL dependencies (root + server)
COPY package*.json ./
RUN npm install

COPY server/package*.json ./server/
RUN cd server && npm install

# Copy everything
COPY . .

# Build React frontend into /app/dist
RUN npm run build

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "server/index.js"]
