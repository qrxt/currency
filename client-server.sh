#!/bin/bash

npm run dev & npm run server

wait -n

exit $?
