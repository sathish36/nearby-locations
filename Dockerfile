#docker build -t sathishgajarla/nearby-locations:0.0.1 -f Dockerfile .
#docker push sathishgajarla/nearby-locations:0.0.1
#docker run -p 9009:9009 sathishgajarla/nearby-locations:0.0.1

#Builder step
FROM node:16-alpine as builder
LABEL maintainer="sathishgajarla"

#create directories
RUN mkdir /code

#backend
COPY . /code

WORKDIR /code/frontend

#install packages in frontend
RUN yarn install --production=false

#build frontend
RUN npm run build:force

WORKDIR /code/backend
#install packages in backend
RUN yarn install --production=false

#build backend
RUN npm run build

#STEP FINAL
FROM node:16-alpine
LABEL maintainer="adhityan"

ENV NODE_ENV 'production'

WORKDIR /app
COPY --from=builder /code/backend/yarn.lock /app/backend/
COPY --from=builder /code/backend/package.json /app/backend/

WORKDIR /app/backend
#install production packages
RUN yarn install --production=true

#Copy built binaries
COPY --from=builder /code/backend/build /app/backend/build

#Copy configuration files
COPY --from=builder /code/frontend/build /app/frontend/build

#always protect yourself
# USER 1000

WORKDIR /app/backend

EXPOSE 9000

CMD [ "yarn", "start" ]
