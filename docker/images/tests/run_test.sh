#!/bin/sh

newman run /opt/tests/test.postman_collection.json
npm run e2e
