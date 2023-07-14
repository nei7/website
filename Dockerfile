FROM node:16-alpine
RUN apk add g++ make py3-pip

ARG SUPABASE_URL
ARG SUPABASE_KEY


ENV SUPABASE_URL $SUPABASE_URL
ENV SUPABASE_KEY $SUPABASE_KEY

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN npm i --legacy-peer-deps && npm cache clean --force
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]