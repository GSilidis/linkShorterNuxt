FROM node:16.14.0

RUN yarn global add cross-env

ADD . link_shorter/
RUN cd link_shorter/ \
    rm -rf node_modules && \
    rm -rf .nuxt && \
    node -v && \
    yarn install && \
    yarn build
