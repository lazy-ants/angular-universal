#!/bin/bash
SERVER_NAME='angular-universal' # Replace this with actual value

pm2 show $SERVER_NAME | sed -n '3p' | sed 's: ::g' | grep '│status│online│' | grep -v grep > /dev/null
if [ $? != 0 ]
then
    echo 'The instance of Nodejs server failed to start. Try to build the application manually and check the logs.'
    exit 1
else
    echo 'The instance of Nodejs server successfully started.'
    exit 0
fi
