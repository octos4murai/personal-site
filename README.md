# personal-site

## Setup

```bash
# Start a node container using Docker...
$ sudo docker run --rm -it -v "$(pwd)":/personal-site -p 8080:8080 node bash

# ... or using Docker compose
$ sudo docker-compose run personal-site bash

# Inside the container, install any missing packages
$ cd personal-site
$ npm ci

# Still in the container, start a development server
$ npx @11ty/eleventy --serve
```
