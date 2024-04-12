package controllers

import (
	"net/http"
	"time"

	"github.com/gorvk/rent-app/server/api-services/common"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	err := common.CheckHttpResponseType(w, r, http.MethodGet)
	if err != nil {
		return
	}

	cookie := &http.Cookie{
		Name:     "rent_app_jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, cookie)
}
