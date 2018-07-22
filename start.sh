#!/bin/bash

lt --port 2225 --subdomain apiolgicscuvinte&
cd ./api
forever server.js