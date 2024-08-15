#!/bin/bash

REPO_URL="https://github.com/taphix/prod.git"
REPO_DIR="prod"

update_repo() {
    if [ -d "$REPO_DIR" ]; then
        cd "$REPO_DIR"
        git pull origin main
        cd ..
    else
        git clone "$REPO_URL"
    fi
}

stop_containers() {
    if [ -d "$REPO_DIR" ]; then
        cd "$REPO_DIR"
        docker compose down
        cd ..
    fi
}

build_and_run_containers() {
    if [ -d "$REPO_DIR" ]; then
        cd "$REPO_DIR"
        docker compose up --build -d
        cd ..
    fi
}

restart_containers() {
    if [ -d "$REPO_DIR" ]; then
        cd "$REPO_DIR"
        docker compose down
        docker compose up --build -d
        cd ..
    fi
}

update_repo
stop_containers
build_and_run_containers
restart_containers

echo "Deployment complete."