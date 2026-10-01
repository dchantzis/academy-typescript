FROM node:24-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends gosu \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www
ENV HOME=/tmp/typescript-home NPM_CONFIG_CACHE=/tmp/typescript-home/.npm
COPY --chmod=755 docker-configuration/entrypoint/start-container /usr/bin/start-container
COPY --chmod=755 docker-configuration/entrypoint/start-container-local /usr/bin/start-container-local
ENTRYPOINT ["/usr/bin/start-container"]
CMD ["sleep", "infinity"]
