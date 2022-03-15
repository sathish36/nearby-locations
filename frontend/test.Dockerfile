#docker build -f test.Dockerfile --no-cache -t saleskey/consumer .
#docker run saleskey/consumer yarn lint
#docker run saleskey/consumer yarn test:ci

#core
FROM node:12
LABEL maintainer="adhityan"
LABEL product="@saleskey/consumer"
LABEL trademark="Gamechange Solutions"

#setup
ENV PROJECT=consumer
RUN mkdir /code

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

# Add the keys
COPY build.ssh /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

#clone root
RUN git clone git@github.com:gcsns/saleskey-project.git /code
WORKDIR /code

#copy config
COPY config-overrides.js /code/frontend/${PROJECT}/config-overrides.js
COPY .prettierignore /code/frontend/${PROJECT}/.prettierignore
COPY .prettierrc.js /code/frontend/${PROJECT}/.prettierrc.js
COPY jest.config.js /code/frontend/${PROJECT}/jest.config.js
COPY browserslist /code/frontend/${PROJECT}/browserslist
COPY .eslintrc.js /code/frontend/${PROJECT}/.eslintrc.js
COPY cypress.json /code/frontend/${PROJECT}/cypress.json

#copy tc settings
COPY tsconfig.json /code/frontend/${PROJECT}/tsconfig.json
COPY tsconfig.paths.json /code/frontend/${PROJECT}/tsconfig.paths.json

#clone dependencies
RUN git submodule init plugins frontend/shared frontend/admin
RUN git submodule update

#Copy both package.json and yarn-lock files
COPY package.json /code/frontend/${PROJECT}/package.json

#install packages
WORKDIR /code/frontend
RUN yarn install

#copy source
COPY /src/ /code/frontend/${PROJECT}/src/
COPY /public/ /code/frontend/${PROJECT}/public/
COPY /cypress/ /code/frontend/${PROJECT}/cypress/

#set source as working
WORKDIR /code/frontend/${PROJECT}

#Run test
CMD [ "yarn", "test:ci" ]