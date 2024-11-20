#!/bin/bash
echo "Build script"

npm install
rm -rf dist

cd frontend
npm install
npm run build

cp -r dist ../