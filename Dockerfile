FROM node:16-alpine
RUN apk add g++ make py3-pip


RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN npm install -g pnpm

RUN pnpm i 
RUN pnpm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]