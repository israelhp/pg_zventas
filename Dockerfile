# build stage
FROM node:20.5.0-alpine3.17 as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /.
RUN npm install --silent
COPY . .
RUN npm run build

# final stage
FROM nginx:1.25.1-alpine3.17 as prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
