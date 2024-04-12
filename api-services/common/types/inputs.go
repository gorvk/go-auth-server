package types

type LOGIN_USER_INPUT struct {
	Email           string `db:"email" json:"email"`
	AccountPassword string `db:"account_password" json:"accountPassword"`
}

type GET_USER_BY_EMAIL_INPUT struct {
	Email string `db:"email" json:"email"`
}
