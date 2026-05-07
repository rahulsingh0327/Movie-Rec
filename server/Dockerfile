FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install root dependencies (Vite + React)
COPY package*.json ./
RUN npm install

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy everything
COPY . .

# Build React frontend into /app/dist
RUN npm run build

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "server/index.js"]
