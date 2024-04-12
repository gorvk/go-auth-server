package models

import (
	"database/sql"
	"fmt"

	"github.com/gorvk/rent-app/server/api-services/initializers"
)

func GetUserByEmail(email string) (*sql.Rows, error) {
	db := initializers.GetDBInstance()
	if db == nil {
		return nil, nil
	}
	query := fmt.Sprintf("SELECT * from read_user_by_column('%v', '%v'::TEXT)", "email", email)
	rows, err := db.Query(query)
	return rows, err
}
