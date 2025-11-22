#!/bin/bash

services=("cart-service" "payment-service" "shipping-service" "email-service" "checkout-service" "currency-service")
ports=(3004 3005 3006 3007 3008 3009)

for i in "${!services[@]}"; do
  service="${services[$i]}"
  port="${ports[$i]}"
  
  echo "Scaffolding $service on port $port..."
  
  mkdir -p "$service/src"
  
  # package.json
  cat > "$service/package.json" <<EOF
{
  "name": "$service",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev src/index.ts"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "pg": "^8.10.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/pg": "^8.6.6",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4"
  }
}
EOF

  # tsconfig.json
  cat > "$service/tsconfig.json" <<EOF
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
EOF

  # Dockerfile
  cat > "$service/Dockerfile" <<EOF
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE $port

CMD ["npm", "start"]
EOF

  # src/index.ts
  cat > "$service/src/index.ts" <<EOF
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || $port;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('$service is running');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: '$service' });
});

app.listen(port, () => {
    console.log(\`$service running on port \${port}\`);
});
EOF

done

echo "Scaffolding complete."
