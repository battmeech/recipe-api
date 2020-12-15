FROM node

WORKDIR /server
COPY . ./
EXPOSE 3000

RUN npm ci
RUN npm run build

CMD PORT=3000 DATABASE_URL=mongodb://mongo:27017/recipe npm start