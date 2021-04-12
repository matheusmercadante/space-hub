#!/usr/bin/env bash
set -e

# Build images containers
docker-compose -f containers/docker-compose.dev.yaml build