#!/bin/bash
mongo new-pwa --eval 'db.dropDatabase()'
mongorestore --host localhost --port 27017 ./backup/new-pwa --db new-pwa