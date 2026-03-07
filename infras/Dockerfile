FROM node:20.10.0-alpine3.19 AS base

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY public ./public

COPY --chown=nextjs:nodejs build/standalone ./
COPY --chown=nextjs:nodejs build/static ./build/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c","node server.js"]