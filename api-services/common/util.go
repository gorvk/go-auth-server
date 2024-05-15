package common

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorvk/rent-app/server/api-services/common/constants"
	customTypes "github.com/gorvk/rent-app/server/api-services/common/types"
	"github.com/lib/pq"
)

func HandleDbError(err error, w http.ResponseWriter, friendlyMessage string, statusCode int) {
	if err != nil {
		pqErr, _ := err.(*pq.Error)
		msg := fmt.Sprintf("PostgreSQL Error: %q - %q", friendlyMessage, pqErr.Message)
		data, _ := ConstructResponse(false, msg)
		http.Error(w, string(data), statusCode)
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
		data, _ := ConstructResponse(false, msg)
		http.Error(w, string(data), statusCode)
		return err
	}
	return nil
}

func IsAuthenticated(r *http.Request) (*jwt.Token, error) {
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

func ConstructResponse(isSuccess bool, result any) ([]byte, error) {
	response := customTypes.RESPONSE_PARAMETERS{
		IsSuccess: isSuccess,
		Result:    result,
	}
	data, err := json.Marshal(response)
	return data, err
}

func ExpireCookie(cookieName string, w http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:     "rent_app_jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, cookie)
}

func CastStructs(source interface{}, destination interface{}) error {
	js, err := json.Marshal(source)
	if err != nil {
		return err
	}
	return json.Unmarshal(js, destination)
}
