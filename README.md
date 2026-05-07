# Notes App

This is an old challenge I made

## Requirements

### Runtimes and Tools
- NodeJS
- npm
- Docker
- Docker Compose

## Installation
1. Clone the repository.
2. Run `./setup.sh up` to set up the project and start all necessary services.

# Running the application
To run the application, navigate to the **backend** and **frontend** folders in separate terminal windows and execute:
```bash
npm run dev
```

### Default user
You can log in using the default credentials or create a new user:

```
email: admin@admin.com
password: secret
```

### Important
After finishing your work with the application, run `./setup.sh down` to shut down the Docker container for the database.
