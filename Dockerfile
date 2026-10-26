FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Dev mode (docker-compose.dev.yml): source is bind-mounted, Vite hot-reloads.
FROM node:24-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
EXPOSE 3000
CMD ["sh", "-c", "node scripts/migrate.ts && npm run dev -- --host 0.0.0.0"]

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
# Runtime deps are needed by the migrate and import scripts.
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/.output ./.output
COPY drizzle ./drizzle
COPY scripts ./scripts
COPY src/server/db/schema.ts ./src/server/db/schema.ts
USER node
EXPOSE 3000
CMD ["sh", "-c", "node scripts/migrate.ts && node .output/server/index.mjs"]
