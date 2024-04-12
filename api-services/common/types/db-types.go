package types

type User struct {
	Id              int    `db:"id" json:"id"`
	IsShopEnabled   bool   `db:"is_shop_enabled" json:"isShopEnabled"`
	FirstName       string `db:"first_name" json:"firstname"`
	Email           string `db:"email" json:"email"`
	LastName        string `db:"last_name" json:"lastName"`
	PhoneNumber     string `db:"phone_number" json:"phoneNumber"`
	UserAddress     string `db:"user_address" json:"userAddress"`
	AccountPassword string `db:"account_password" json:"accountPassword"`
}
