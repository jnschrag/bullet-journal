#!/usr/bin/env bash
CODECLIMATE_REPO_TOKEN=688d1d03734a9088af2fb3c66afb2274a8302e89edbf08dfab0a4bb9a5b8a79a node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info
