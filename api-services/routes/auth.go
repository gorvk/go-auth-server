package routes

import (
	"net/http"

	controllers "github.com/gorvk/rent-app/server/api-services/controllers/auth"
)

func init() {
	http.HandleFunc("/api/auth/login", controllers.Login)
	http.HandleFunc("/api/auth/register", controllers.RegisterUserAccount)
	http.HandleFunc("/api/auth/logout", controllers.Logout)
}
