# Stage 1: Build the Application
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Create the Final Production Image
FROM node:18

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app ./

ENV PORT=8080
EXPOSE 8080

USER node

CMD ["npm", "start"]