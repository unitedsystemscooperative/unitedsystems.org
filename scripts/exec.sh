#!/usr/bin/env bash

# Do not run this within a docker container!
# Should attach to the docker container to allow external terminal commands during development.


docker exec -it -w /workspace --user node usc-website_devcontainer_app_1 bash
