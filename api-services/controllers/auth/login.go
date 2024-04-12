package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorvk/rent-app/server/api-services/common"
	"github.com/gorvk/rent-app/server/api-services/common/constants"
	"golang.org/x/crypto/bcrypt"

	customTypes "github.com/gorvk/rent-app/server/api-services/common/types"
	models "github.com/gorvk/rent-app/server/api-services/models/user"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var err error
	err = common.CheckHttpResponseType(w, r, http.MethodGet)
	if err != nil {
		return
	}

	d, err := io.ReadAll(r.Body)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	var payload customTypes.LOGIN_USER_INPUT
	err = json.Unmarshal(d, &payload)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_PARSE_REQUEST, http.StatusBadRequest)
		return
	}

	if payload.Email == "" || payload.AccountPassword == "" {
		common.HandleHttpError(fmt.Errorf(constants.ERROR_HTTP_INVALID_REQUEST_BODY), w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	rows, err := models.GetUserByEmail(payload.Email)
	if err != nil {
		common.HandleDbError(err, w, constants.ERROR_DB_UNABLE_TO_GET_RECORD, http.StatusInternalServerError)
		return
	}

	var bytePassword []byte
	userRow := customTypes.User{}
	defer rows.Close()
	for rows.Next() {
		rows.Scan(
			&userRow.Id,
			&userRow.FirstName,
			&userRow.LastName,
			&userRow.Email,
			&userRow.PhoneNumber,
			&userRow.UserAddress,
			&userRow.IsShopEnabled,
			&bytePassword,
		)
	}

	if len(userRow.Email) == 0 || userRow.Id == 0 {
		http.Error(w, constants.ERROR_HTTP_INVALID_USER, http.StatusBadRequest)
		return
	}

	inputPassword := []byte(payload.AccountPassword)
	err = bcrypt.CompareHashAndPassword(bytePassword, inputPassword)
	if err != nil {
		http.Error(w, constants.ERROR_HTTP_INCORRECT_PASSWORD, http.StatusBadRequest)
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    fmt.Sprint(userRow.Id),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 168)),
	})

	jwtToken, err := claims.SignedString([]byte(os.Getenv("JWT_SINGING_KEY")))
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_LOGIN, http.StatusInternalServerError)
		return
	}

	cookie := &http.Cookie{
		Name:     "rent_app_jwt",
		Value:    jwtToken,
		Expires:  time.Now().Add(time.Hour * 168),
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, cookie)
}
