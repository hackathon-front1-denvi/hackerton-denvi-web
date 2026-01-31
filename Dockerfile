# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code (including .env if it exists)
# .env 파일이 없어도 빌드가 가능하도록 처리
COPY . .

# Read .env file and build with NEXT_PUBLIC_* environment variables
# Using set -a to automatically export all variables from .env
RUN set -a && \
    [ -f .env ] && . .env || true && \
    set +a && \
    yarn build

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# standalone 모드에서는 .next/standalone 디렉토리만 복사하면 됩니다
# 하지만 static 파일과 public 파일도 필요합니다
# standalone 디렉토리의 내용을 루트에 복사 (server.js가 루트에 위치)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT=3000

# Start the application using standalone server
# COPY --from=builder /app/.next/standalone ./ 명령으로 인해
# standalone 디렉토리의 내용이 루트에 복사되므로 server.js는 루트에 있습니다
CMD ["node", "server.js"]
