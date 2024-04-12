package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorvk/rent-app/server/api-services/common"
	"github.com/gorvk/rent-app/server/api-services/common/constants"
	customTypes "github.com/gorvk/rent-app/server/api-services/common/types"
	models "github.com/gorvk/rent-app/server/api-services/models/user"
)

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {

	var err error
	err = common.CheckHttpResponseType(w, r, http.MethodGet)
	if err != nil {
		return
	}

	token, err := common.CheckAuthentication(w, r)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNAUTHORIZED, http.StatusUnauthorized)
		return
	}

	data, err := io.ReadAll(r.Body)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	var payload customTypes.GET_USER_BY_EMAIL_INPUT
	err = json.Unmarshal(data, &payload)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_PARSE_REQUEST, http.StatusBadRequest)
		return
	}

	if payload.Email == "" {
		common.HandleHttpError(fmt.Errorf(constants.ERROR_HTTP_INVALID_REQUEST_BODY), w, constants.ERROR_HTTP_INVALID_REQUEST_BODY, http.StatusBadRequest)
		return
	}

	rows, err := models.GetUserByEmail(payload.Email)
	if err != nil {
		common.HandleDbError(err, w, constants.ERROR_DB_UNABLE_TO_GET_RECORD, http.StatusInternalServerError)
		return
	}

	user := customTypes.User{}
	defer rows.Close()
	for rows.Next() {
		rows.Scan(
			&user.Id,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.PhoneNumber,
			&user.UserAddress,
			&user.IsShopEnabled,
			&user.AccountPassword,
		)
	}

	claims := token.Claims.(*jwt.RegisteredClaims)
	if claims.Issuer != fmt.Sprint(user.Id) {
		common.HandleHttpError(fmt.Errorf(constants.ERROR_HTTP_ACCESS_DENIED), w, constants.ERROR_HTTP_ACCESS_DENIED, http.StatusForbidden)
		return
	}

	var Response customTypes.RESPONSE_PARAMETERS
	Response.Result = user
	data, err = json.Marshal(Response)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_PARSE_RESPONSE, http.StatusInternalServerError)
		return
	}

	_, err = w.Write(data)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_WRITE_RESPONSE, http.StatusInternalServerError)
		return
	}
}
