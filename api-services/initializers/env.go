package initializers

import (
	"fmt"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	if err := godotenv.Load(); err != nil {
		msg := fmt.Sprintf("Error loading .env file: %v", err)
		panic(msg)
	}
}
