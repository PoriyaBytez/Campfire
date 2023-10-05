###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN yarn install --frozen-lockfile --production=true && yarn cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:16-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node --from=build /usr/src/app/templates ./templates
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
