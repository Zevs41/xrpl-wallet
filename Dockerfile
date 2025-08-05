FROM node:20-alpine3.20 as builder

WORKDIR /app
COPY package.json package-lock.json prisma ./
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:20-alpine3.20 as production

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/.env /app/.env

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node main"]