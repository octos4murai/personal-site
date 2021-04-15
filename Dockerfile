FROM node AS deps
WORKDIR /deps
COPY package.json /deps/package.json
RUN npm install

FROM node AS app
WORKDIR /app
COPY --from=deps /deps/node_modules /app/node_modules
CMD ["npx", "@11ty/eleventy", "--serve"]
