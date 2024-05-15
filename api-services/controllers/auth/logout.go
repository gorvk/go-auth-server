package controllers

import (
	"net/http"

	"github.com/gorvk/rent-app/server/api-services/common"
	"github.com/gorvk/rent-app/server/api-services/common/constants"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	err := common.CheckHttpResponseType(w, r, http.MethodGet)
	if err != nil {
		return
	}

	common.ExpireCookie("rent_app_jwt", w)
	data, err := common.ConstructResponse(true, nil)
	if err != nil {
		common.HandleHttpError(err, w, constants.ERROR_HTTP_UNABLE_TO_PARSE_RESPONSE, http.StatusInternalServerError)
		return
	}
	w.Write(data)
}
