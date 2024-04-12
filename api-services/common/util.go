package common

import (
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorvk/rent-app/server/api-services/common/constants"
	"github.com/lib/pq"
)

func HandleDbError(err error, w http.ResponseWriter, friendlyMessage string, statusCode int) {
	pqErr, isPqError := err.(*pq.Error)
	if isPqError {
		msg := fmt.Sprintf("PostgreSQL Error: %q - %q", friendlyMessage, pqErr.Message)
		http.Error(w, msg, statusCode)
	}
}

func CheckHttpResponseType(w http.ResponseWriter, r *http.Request, methodType string) error {
	if r.Method == methodType {
		return nil
	}
	return HandleHttpError(http.ErrNotSupported, w, constants.ERROR_HTTP_METHOD_NOT_ALLOWED, http.StatusMethodNotAllowed)
}

func HandleHttpError(err error, w http.ResponseWriter, friendlyMessage string, statusCode int) error {
	if err != nil {
		msg := fmt.Sprintf("Http Error: %q", friendlyMessage)
		http.Error(w, msg, statusCode)
		return err
	}
	return nil
}

func CheckAuthentication(w http.ResponseWriter, r *http.Request) (*jwt.Token, error) {
	cookie, err := r.Cookie("rent_app_jwt")
	if err != nil {
		return nil, err
	}

	token, err := jwt.ParseWithClaims(cookie.Value, &jwt.RegisteredClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SINGING_KEY")), nil
	})

	if err != nil {
		return nil, err
	}

	return token, err
}
