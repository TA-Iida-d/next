FROM node:latest

RUN npm install -g npm \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -qy --no-install-recommends \
    git \
    openssh-server \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g @aws-amplify/cli

USER node
