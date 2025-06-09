FROM node:24 AS build-stage
WORKDIR /build
COPY . .
RUN npm run tsc
RUN npm --prefix frontend run build

FROM node:24-alpine
USER node
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build-stage /build/build .
COPY --from=build-stage /build/package*.json .
COPY --from=build-stage /build/frontend/dist dist
RUN mkdir files
RUN npm ci
CMD ["index.js"]
