FROM node:20.15.1
WORKDIR /app
RUN apt update && apt install -y git
COPY package*.json ./
COPY images40.txt ./
RUN npm install
CMD ["node","dist/main"]