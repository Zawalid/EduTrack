#!/bin/bash

curl -i -X POST http://localhost:8001/services/ \
  --data "name=students-service" \
  --data "url=http://host.docker.internal:8080/api/students"

curl -i -X POST http://localhost:8001/services/ \
  --data "name=grades-service" \
  --data "url=http://host.docker.internal:3001/api/grades"
