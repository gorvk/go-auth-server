package routes

import (
	"net/http"

	controllers "github.com/gorvk/rent-app/server/api-services/controllers/user"
)

func init() {
	http.HandleFunc("/api/user/my-account", controllers.GetCurrentUser)
}
