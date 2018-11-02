# Configuring Nginx

# Cloud Foundry

This project currently uses `https://github.com/cloudfoundry/staticfile-buildpack.git` as it's buildpack for cloudfoundry.

The supplied `nginx.conf` file overwrites the default static buildpack version. During cloudfoundry building, each `<%= ENV["ENVVAR_NAME"] %>` is replaced by its environment variable value.

## Docker

When building in docker, this process is mimicked by `docker-entrypoint.sh` which replaces each EnvVar. The `Dockerfile` then specifies the Envs to be used in the replacement.

## React

When running the webclient in developement mode `yarn start-dev`, the `proxy`s in the `package.json` needs to be kept up to date with the various services running.

---

`nginx.conf`, `docker-entrypoint.sh`, `Dockerfile` & `package.json` all need to be kept in sync.
