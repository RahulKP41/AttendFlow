FROM jenkins/jenkins:lts

USER root

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    ca-certificates \
    gnupg \
    lsb-release

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Install Docker CLI
RUN apt-get install -y docker.io

# Install Docker Compose Plugin
RUN mkdir -p /usr/local/lib/docker/cli-plugins

RUN curl -SL \
https://github.com/docker/compose/releases/download/v2.39.1/docker-compose-linux-x86_64 \
-o /usr/local/lib/docker/cli-plugins/docker-compose

RUN chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verify installations
RUN node -v && \
    npm -v && \
    docker --version && \
    docker compose version

USER jenkins