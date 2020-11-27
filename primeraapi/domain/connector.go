package domain

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

// DB exported
var DB *sqlx.DB

//SQLConnector Holds the database connection
type SQLConnector struct {
	database sqlx.DB
}

// NewConnector creates the connector
func NewConnector(url string) *SQLConnector {
	db, err := sqlx.Connect("mysql", url)

	if err != nil {
		panic(fmt.Errorf("Error connecting database: %s", err.Error()))
	}
	fmt.Println("Connected to DB")
	DB = db
	return &SQLConnector{database: *db}
}
