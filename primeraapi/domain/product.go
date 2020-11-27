package domain

// Product hols product struc
type Product struct {
	Idproducts uint64  `json:"idproducts" db:"idproducts"`
	Name       string  `json:"name" db:"name"`
	Price      float64 `json:"price" db:"price"`
	CID        uint64  `json:"cid" db:"cid"`
	UID        uint64  `json:"uid" db:"uid"`
}

//GetAllProducts retrieves all the Products
func GetAllProducts() ([]Product, error) {
	result := []Product{}

	query := `SELECT * FROM products`

	if err := DB.Select(&result, query); err != nil {
		return nil, err
	}

	return result, nil
}

//GetProductByID retrieves the Product by the given ID
func GetProductByID(id uint64) (*Product, error) {
	var result Product

	query := `SELECT * FROM products WHERE idproducts=?`

	if err := DB.Get(&result, query, id); err != nil {
		return nil, err
	}

	return &result, nil
}

//CreateProduct stores a Product in the database and returns its ID
func CreateProduct(product Product) (*uint64, error) {

	query := `INSERT INTO products VALUES (idproducts, :name, :price, :cid, :uid)`
	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Exec(&product)
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

//DeleteProductByID deletes an product object by its id
func DeleteProductByID(productID uint64) error {

	query := `DELETE FROM products WHERE idproducts=?`

	if _, err := DB.Exec(query, productID); err != nil {
		return err
	}

	return nil
}

//EditProductByID updates a product by its id in the database
func EditProductByID(product Product) (*uint64, error) {

	query := `UPDATE products SET name=:name, price=:price, cid=:cid, uid=:uid WHERE idproducts=:idproducts`

	stmt, err := DB.PrepareNamed(query)
	if err != nil {
		return nil, err
	}

	result, err := stmt.Exec(&product)
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
