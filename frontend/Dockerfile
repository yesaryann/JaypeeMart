# Step 1: Base Image
FROM node:18-alpine

# Step 2: Working Directory
WORKDIR /app

# Step 3: Copy only the dependencies file first
COPY package*.json ./

# Step 4: Install exactly what's requested in package.json
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Document the port Vite runs on
EXPOSE 5173

# Step 7: Run the Vite development server (must include --host to work in Docker!)
CMD ["npm", "run", "dev", "--", "--host"]
