#!/bin/bash

check_error() {
  if [ $? -ne 0 ]; then
    echo "An error occurred. Exiting."
    exit 1
  fi
}

echo_green() {
  echo -e "\033[32m$1\033[0m"
}

setup(){
  echo_green "Installing frontend dependencies..."
  cd frontend
  npm install
  check_error

  echo_green "Setting up backend..."
  cd ../backend

  # Create .env file if it doesn't exist
  if [ ! -f .env ]; then
    echo_green "Creating .env file..."
    SESSION_SECRET=$(openssl rand -hex 32)
    cat <<EOL > .env
SERVER_PORT=3000
SECRET=$SESSION_SECRET
POSTGRES_DB="postgres"
POSTGRES_USER="user"
POSTGRES_PASSWORD="s1cr3t"
DATABASE_URL="postgresql://user:s1cr3t@localhost:5432/postgres"
EOL
  fi

  echo_green "Installing backend dependencies..."
  npm install
  check_error

  echo_green "Starting the backend Docker container..."
  docker compose up -d
  check_error

  until docker compose exec postgres pg_isready; do
    echo_green "Waiting for the database to be ready..."
    sleep 3
  done

  echo_green "Running database migrations..."
  npx prisma migrate dev
  check_error

  echo_green "Seeding the database..."
  npm run seed
  check_error
}

stop(){
  echo_green "Stopping the backend Docker container..."
  cd backend
  docker compose down
  check_error

  echo_green "Cleanup completed."
}

case "$1" in
  up)
    setup
    ;;
  down)
    stop
    ;;
  *)
    echo "Usage: $0 {up|down}"
    exit 1
    ;;
esac
