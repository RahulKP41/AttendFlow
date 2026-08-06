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

# Verify installations
RUN node -v && npm -v && docker --version

USER jenkins