FROM node

ENV PORT=3000
ENV DATABASE_URL=mongodb://mongo:27017/recipe

WORKDIR /server
COPY . ./
EXPOSE 3000

RUN npm ci
RUN npm run build

CMD PORT=${PORT} DATABASE_URL=${DATABASE_URL} npm start