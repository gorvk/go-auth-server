package initializers

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

func ConnectDB() {
	var err error
	DB_CONNECTION_STRING := os.Getenv("DB_CONNECTION_STRING")
	db, err = sql.Open("postgres", DB_CONNECTION_STRING)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Println("DB Connected")
}

func GetDBInstance() *sql.DB {
	return db
}
