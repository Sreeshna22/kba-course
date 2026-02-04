# Use Node.js LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
