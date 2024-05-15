package types

type User struct {
	Id              int    `db:"id" json:"id"`
	FirstName       string `db:"first_name" json:"firstname"`
	Email           string `db:"email" json:"email"`
	LastName        string `db:"last_name" json:"lastName"`
	AccountPassword string `db:"account_password" json:"accountPassword"`
}
