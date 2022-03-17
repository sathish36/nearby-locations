# nearby-locations
Shows locations near by in a given range

This project as both backend and frontend

Here is the docker image for the same: `sathishgajarla/nearby-locations:0.0.1`

command to run the server 
```
docker run -p 9009:9009 sathishgajarla/nearby-locations:0.0.1
```
now on `localhost:9009` the frontend is available and api's are exposed on `/api`

#development mode
to run backend 
```
cd backend
yarn install
npm run start:dev
```

to run the frontend in dev mode

```
cd frontend
yarn install
npm run start:force
```

we need to use nginx to serve both frontend and backend on same port, so that there won't be cors issue.

we can run the servers using docker, due to time limit that is not picked

# production mode

use docker image to build and run

```
#docker build -t sathishgajarla/nearby-locations:tag -f Dockerfile .
#docker run -p 9009:9009 sathishgajarla/nearby-locations:tag
```

docker build takes care of building both frontend and backend

