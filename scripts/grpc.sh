#!/usr/bin/env sh

API_REPOSITORY="git@gitlab.ack.ee:Backend/flash-sport-userapi.git"
BRANCH="development"

GRPC_DIR="${PWD}/grpc"
IN_DIR="${GRPC_DIR}/proto"
OUT_DIR="${GRPC_DIR}/build"

TEMP_GIT_DIR="${GRPC_DIR}/api"
TEMP_PROTO_DIR="${TEMP_GIT_DIR}/proto"

#JS_OUT_FLAGS=import_style=commonjs
#WEB_OUT_FLAGS=import_style=commonjs+dts,mode=grpcwebtext

if [ "$1" != "" ]; then
    BRANCH="${1}"
fi

echo "Removing old GRPC directories."
rm -rf "${GRPC_DIR}"

echo "Creating new GRPC directories."
mkdir "${GRPC_DIR}"
mkdir "${OUT_DIR}"

echo "Cloning *.proto files from ${API_REPOSITORY}:${BRANCH}"
git clone --branch "${BRANCH}" "${API_REPOSITORY}" "${TEMP_GIT_DIR}"
mv "${TEMP_PROTO_DIR}" "${IN_DIR}"
ls -lah "${IN_DIR}"

echo "Removing cloned repository"
rm -rf "${TEMP_GIT_DIR}"

echo "Building GRPC files"

# grpc_tools_node_protoc --plugin=${PWD}/scripts/protoc-gen-grpc-web --js_out=${JS_OUT_FLAGS}:${OUT_DIR} --grpc-web_out=${WEB_OUT_FLAGS}:${OUT_DIR} --proto_path=${IN_DIR} ${IN_DIR}/*
grpc_tools_node_protoc --plugin=ts-protoc-gen=./node_modules/.bin/ts-protoc-gen  --js_out="import_style=commonjs,binary:${OUT_DIR}"  --ts_out="service=true:${OUT_DIR}" -I ${IN_DIR} ${IN_DIR}/*.proto ${IN_DIR}/**/*.proto
echo "Injecting esling-disable into the built GRPC files"
find ${GRPC_DIR} -type f -name '*.js' -exec sed -i.bak '1s/^/\/* eslint-disable *\/ /' {} \;
find ${GRPC_DIR} -type f -name '*.bak' -delete
exit 0
