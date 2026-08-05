# ===============================
# Stage 1 - Install Dependencies
# ===============================
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

# ===============================
# Stage 2 - Production Image
# ===============================
FROM node:22-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN chown -R nodeapp:nodeapp /app

USER nodeapp

EXPOSE 5000

CMD ["npm", "start"]