FROM node:20.15.1
WORKDIR /app
RUN apt update && apt install -y git
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
