package domain

import "fmt"

// Users holds user struct
type Users struct {
	UID      uint64 `json:"u_id" db:"uid"`
	Name     string `json:"name" db:"name"`
	LastName string `json:"last_name" db:"lastName"`
	Mail     string `json:"mail" db:"mail"`
}

// GetAllUsers funcion para conseguir todos los usuarios
func GetAllUsers() ([]Users, error) {
	result := []Users{}
	query := `SELECT * FROM users`
	if err := DB.Select(&result, query); err != nil {
		return nil, err
	}
	return result, nil
}

//GetUserByID retrieves the User by the given ID
func GetUserByID(id uint64) (*Users, error) {
	var result Users

	query := `SELECT * FROM users WHERE uid=? LIMIT 1`

	if err := DB.Get(&result, query, id); err != nil {
		return nil, err
	}

	return &result, nil
}

// InsertUser inserta un usuario
func InsertUser(user Users) (*uint64, error) {
	query := `INSERT INTO users VALUES (:uid, :name, :lastName, :mail)`
	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}
	result, err := stmt.Exec(&user)
	if err != nil {
		return nil, err
	}
	intID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	uintID := uint64(intID)
	return &uintID, nil
}

// RemoveUserByID removes a user by an id
func RemoveUserByID(userID uint64) error {
	query := `DELETE FROM users where uid=?`
	if _, err := DB.Exec(query, userID); err != nil {
		return err
	}
	return nil
}

// UpdateuserByID updates an user by id
func UpdateuserByID(user Users) (*uint64, error) {

	query := `UPDATE users SET name=:name, lastName=:lastName, mail=:mail WHERE uid=:uid`
	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Exec(&user)
	if err != nil {
		fmt.Print(err)
		return nil, err
	}

	intID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	uintID := uint64(intID)
	return &uintID, nil
}
