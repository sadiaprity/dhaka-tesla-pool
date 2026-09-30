FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./
COPY src ./src

ARG DATABASE_URL=postgresql://tesla:tesla@postgres:5432/dhaka_tesla_pool
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]