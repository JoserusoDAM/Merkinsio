package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	// Import the MySQL driver here because we want to use it here instead of main
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// Category holds category struc
type Category struct {
	CID  int64  `json:"c_id" db:"cid"`
	Name string `json:"name" db:"name"`
}

// Sirve para estructurar la respuesta al servidor cuando hago la peticion
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.WriteHeader(code)
	w.Write(response)
}

// Lanza mensaje de error
func respondWithError(w http.ResponseWriter, code int, msg string) {
	respondWithJSON(w, code, map[string]string{"error": msg})
}

// ESTA SERIA LA CARPETA DOMAIN
// Hace una peticion a la base de datos para que devuelta todas las categorias
func getAllCategories() ([]Category, error) {
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

// Funcion para insentar una categoria, le pasa por parametro la categoria y devuelve una id
func insertCaterogy(category Category) (*uint64, error) {
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

// ESTA SERIA LA CARPETA SERVER
// Metodo para realizar la peticion al servidor
func selectAllCategories(w http.ResponseWriter, req *http.Request) {
	// declaro una varialbe que le asignara todas la categorias, que es el metodo que llama a la base de datos
	categories, err := getAllCategories()
	// si el error no es nulo te responde el error
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}
	// si todo va bien tira del metodo respondJSON y te devuelve las categorias
	respondWithJSON(w, http.StatusOK, categories)
}

func createCategory(w http.ResponseWriter, req *http.Request) {

}

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

func main() {
	NewConnector("root:1234@/merkinsio")
	http.HandleFunc("/categories", selectAllCategories)
	http.ListenAndServe(":8090", nil)
}
