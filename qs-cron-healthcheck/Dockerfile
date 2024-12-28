FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run pipe

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist /app

CMD ["node", "src/main.js"]
