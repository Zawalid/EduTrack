#!/bin/bash

curl -i -X POST http://localhost:8001/services/ \
  --data "name=students-service" \
  --data "url=http://edu-track-spring-boot:8080/api/students"

curl -i -X POST http://localhost:8001/services/ \
  --data "name=grades-service" \
  --data "url=http://edu-track-node-js:3001/api/grades"
