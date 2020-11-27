package domain

import "fmt"

// Category holds category struct
type Category struct {
	CID  uint64 `json:"c_id" db:"cid"`
	Name string `json:"name" db:"name"`
}

// GetAllCategories hace una peticion a la base de datos para que devuelta todas las categorias
func GetAllCategories() ([]Category, error) {
	// resultados es el array de categorias
	result := []Category{}
	// la consulta que le paso luego al select
	query := `SELECT * FROM category`
	// el select tiene recibe la direccion de memoria de result y la query
	if err := DB.Select(&result, query); err != nil {
		return nil, err
	}
	// devuelve el resultado
	return result, nil
}

//GetCategorytByID retrieves the Category by the given ID
func GetCategorytByID(id uint64) (*Category, error) {
	var result Category

	query := `SELECT * FROM category WHERE cid=?`

	if err := DB.Get(&result, query, id); err != nil {
		return nil, err
	}

	return &result, nil
}

// InsertCaterogy funcion para insentar una categoria, le pasa por parametro la categoria y devuelve una id
func InsertCaterogy(category Category) (*uint64, error) {
	// le pasamos la query
	query := `INSERT INTO category VALUES (:cid, :name)`
	// El statemet recibe la query
	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}
	// Ejecutamos el statement y lo asignamos al resultado
	result, err := stmt.Exec(&category)
	if err != nil {
		return nil, err
	}
	// devuelve el ultimo id del ultimo insert realizado
	intID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	// castea a uint64 el id que hemos recibido y lo devolvemos
	uintID := uint64(intID)
	return &uintID, nil
}

// RemoveCategoryByID funcion para eliminar una categoria por una id
func RemoveCategoryByID(categoryID uint64) error {
	// le paso la query
	query := `DELETE FROM category where cid=?`
	// si hay algun error al ejecutar la query lo devuelve sino la ejectura y no hace nada mas
	if _, err := DB.Exec(query, categoryID); err != nil {
		return err
	}

	return nil
}

// UpdateCategoryByID actualiza una categoria
func UpdateCategoryByID(category Category) (*uint64, error) {
	query := `UPDATE category SET name=:name WHERE cid=:cid`
	// Prepara la query
	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}
	// la ejecuta
	result, err := stmt.Exec(&category)
	if err != nil {
		fmt.Print(err)
		return nil, err

	}
	// le da el valor del ultimo id
	intID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	// lo parsea
	uintID := uint64(intID)
	// devuelve la id
	return &uintID, nil
}
