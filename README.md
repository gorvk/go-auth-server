# Go JWT Auth Server (Email, Password)

**Tech Stack**
---
* Programming Language - Go
* DB - PostgreSQL

**Setup**
---
* Create a Database in PostgreSQL.
* Run */database/migration_script.sh* script for creating all the Tables, Functions and Stored Procedures.
* Edit the */api-services/.env* with your ENVs.
* Download all the required go packages from */api-services* using following command  
    ``` go get download ```
* Start the server from /api-services using following command  
    ``` go run .```

**API Routes**
---
[Click here for API Documentation](https://documenter.getpostman.com/view/34082066/2sA3Bheudy)
* /api/auth/login - login user
* /api/auth/register - create new user
* /api/auth/logout - logout current user
* /api/user/my-account - get detail about current user