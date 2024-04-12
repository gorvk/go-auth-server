package controllers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gorvk/rent-app/server/api-services/common"
	"github.com/gorvk/rent-app/server/api-services/common/constants"

	customTypes "github.com/gorvk/rent-app/server/api-services/common/types"
	models "github.com/gorvk/rent-app/server/api-services/models/auth"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUserAccount(w http.ResponseWriter, r *http.Request) {
	var err error
	err = common.CheckHttpResponseType(w, r, http.MethodPost)
	if err != nil {
		return
	}

	d, err := io.ReadAll(r.Body)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	var user customTypes.User
	err = json.Unmarshal(d, &user)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	if user.Email == "" || user.AccountPassword == "" {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	bytePassword := []byte(user.AccountPassword)
	saltHashedPassword, err := bcrypt.GenerateFromPassword(bytePassword, 14)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	_, err = models.RegisterNewUser(user, saltHashedPassword)
	common.HandleDbError(err, w, constants.ERROR_DB_UNABLE_TO_CREATE_RECORD, http.StatusInternalServerError)
}