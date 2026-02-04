# Use Node.js LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose port
EXPOSE 3000

# Start Vite dev server
CMD ["npm", "run", "dev"]
