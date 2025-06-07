FROM node:24 AS build-stage
WORKDIR /build
COPY . .
RUN npm run tsc

FROM node:24-alpine
USER node
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build-stage /build/build .
COPY --from=build-stage /build/package*.json .
RUN npm ci
CMD ["index.js"]
