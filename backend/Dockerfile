# Use Node.js LTS
FROM node:22-alpine

# Application directory
WORKDIR /app

# Copy package files first (better cache)
COPY package*.json ./

# Install only production dependencies
RUN npm ci

# Copy application source
COPY . .

# Expose application port
EXPOSE 5000

# Start application
CMD ["npm", "start"]