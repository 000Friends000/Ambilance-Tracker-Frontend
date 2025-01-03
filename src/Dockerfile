FROM node:18 as build

WORKDIR /app

# copy package files
COPY package*.json ./

# install dependencies using the correct flag
RUN npm ci --omit=dev

# copy project files
COPY . .

# build the project
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
