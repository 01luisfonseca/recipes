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
# Sensitive
ARG DB_USERNAME_ARG
# Sensitive
ENV DB_USERNAME=${DB_USERNAME:-${DB_USERNAME_ARG}}
# Sensitive
ARG DB_PASSWORD_ARG
# Sensitive
ENV DB_PASSWORD=${DB_PASSWORD:-${DB_PASSWORD_ARG}}
# Sensitive
ARG DB_HOST_ARG
# Sensitive
ENV DB_HOST=${DB_HOST:-${DB_HOST_ARG}}
# Sensitive
ARG DB_PORT_ARG
# Sensitive
ENV DB_PORT=${DB_PORT:-${DB_PORT_ARG}}
# Sensitive
ARG DB_SERVERTYPE_ARG
# Sensitive
ENV DB_SERVERTYPE=${DB_SERVERTYPE:-${DB_SERVERTYPE_ARG}}
CMD [ "node", "dist/main.js" ]