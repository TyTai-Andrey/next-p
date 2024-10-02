FROM node:20.14.0-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20.14.0-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:20.14.0-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

ENTRYPOINT ["npm", "run", "start"]
