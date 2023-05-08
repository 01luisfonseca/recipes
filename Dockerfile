###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
ARG DB_USERNAME_ARG
ARG DB_PASSWORD_ARG
ARG DB_HOST_ARG
ARG DB_PORT_ARG
ENV DB_USERNAME=${DB_USERNAME_ARG:-${DB_USERNAME}}
ENV DB_PASSWORD=${DB_PASSWORD_ARG:-${DB_PASSWORD}}
ENV DB_HOST=${DB_HOST_ARG:-${DB_HOST}}
ENV DB_PORT=${DB_PORT_ARG:-${DB_PORT}}
CMD [ "node", "dist/main.js" ]