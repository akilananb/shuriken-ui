# Step 1: Base image with Node.js 18
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /home/ncd/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

RUN cp -R .next/standalone/* ./

# Step 6: Start command
CMD ["node", "/home/ncd/app/server.js"]
