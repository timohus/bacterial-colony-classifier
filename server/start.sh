#!/bin/sh

# Source env variable from .env file
# set -a && . /code/.env && set +a

# if [ ! -z $1 ]
# then
#     echo "Setting DATABASE_URL to: $1"
#     export DATABASE_URL=$1
# else
#     echo "Using default DB settings"
# fi

supervisord -c /etc/supervisord.conf -n
