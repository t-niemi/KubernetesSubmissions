FROM ubuntu
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/local/bin
COPY . .

