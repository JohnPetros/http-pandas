FROM oven/bun

WORKDIR /app

# Update package lists and install fontconfig
RUN apt-get update && \
    apt-get install -y fontconfig

# Set environment variables
ENV FONTCONFIG_PATH=/etc/fonts
ENV FONTCONFIG_FILE=/etc/fonts/fonts.conf

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "src/server.ts"]