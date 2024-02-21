FROM node:18-alpine

# Create and set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json  ./
RUN npm install --force

COPY next.config.js ./next.config.js
# Copy application code
COPY . .

COPY pages ./pages
COPY public ./public
COPY styles ./styles
# Build the application
# ENV BUILD_STANDALONE true
RUN npm run build


EXPOSE 3000
# ENV PORT 3000
# ENV HOSTNAME "localhost"
# Run the application
CMD ["next", "start"]






# FROM node:18-alpine

# # Create and set working directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Copy package.json and install dependencies
# COPY package.json  ./
# RUN npm install --force

# COPY next.config.js ./next.config.js
# # Copy application code
# COPY . .

# COPY pages ./pages
# COPY public ./public
# COPY styles ./styles
# # Build the application
# # ENV BUILD_STANDALONE true
# RUN npm run build


# EXPOSE 3000
# # ENV PORT 3000
# # ENV HOSTNAME "localhost"
# # Run the application
# CMD ["next", "start"]





# # Slightly modified version of next.js's with-docker Dockerfile
# # https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# # Install dependencies only when needed
# FROM node:20-alpine AS deps

# ENV NODE_ENV=production

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# WORKDIR /app

# COPY package.json  ./
# # RUN npm install nodemon --force
# RUN npm install --force

# # Rebuild the source code only when needed
# FROM node:20-alpine AS builder

# ENV NODE_ENV=production


# WORKDIR /app

# COPY next.config.js ./
# COPY package.json ./
# COPY --from=deps /app/node_modules ./node_modules

# COPY . .
# COPY pages ./pages
# COPY public ./public
# COPY styles ./styles

# RUN npm run build 

# # Production image, copy all the files and run next
# FROM node:20-alpine AS runner
# WORKDIR /app


# ENV NODE_ENV=production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# CMD [ "npm","start"]
