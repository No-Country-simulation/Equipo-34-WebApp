FROM oven/bun:1.2.23

COPY package.json ./
COPY bun.lockb ./   
COPY tsconfig.json ./
COPY src ./src/

RUN bun install

EXPOSE 3001

CMD ["bun", "--watch", "src/server.ts"]