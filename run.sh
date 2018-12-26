#!/bin/bash

if [ "$NODE_ENV" == 'production' ]; then
 npm run start:production
fi
 npm run start
