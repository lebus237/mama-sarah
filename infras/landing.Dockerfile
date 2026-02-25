FROM node:18-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY packages/landing/public ./packages/landing/public

COPY --chown=nextjs:nodejs packages/landing/build/standalone ./
COPY --chown=nextjs:nodejs packages/landing/build/static ./packages/landing/build/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "cd packages/landing && node server.js"]