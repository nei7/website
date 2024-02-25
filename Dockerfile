FROM node:20-alpine as builder

WORKDIR /app
RUN apk --no-cache add openssh g++ make python3 git

ADD . /app

RUN npm install -g pnpm

RUN pnpm i 
RUN pnpm run build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output  /app/.output
COPY --from=builder /app/.nuxt  /app/.nuxt

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]