package server

import (
	"api/domain"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

//CreateProduct Stores the Product in the database
func CreateProduct(w http.ResponseWriter, req *http.Request) {
	var body domain.Product

	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	id, err := domain.CreateProduct(body)
	if err != nil {
		badRequest(w, err.Error())
		return
	}

	body.Idproducts = *id
	respondWithJSON(w, http.StatusOK, body)
}

//SelectAllProducts Entry point to return an array of Products
func SelectAllProducts(w http.ResponseWriter, r *http.Request) {

	product, err := domain.GetAllProducts()
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}

	respondWithJSON(w, http.StatusOK, product)
}

// EditProductByID edits a product
func EditProductByID(w http.ResponseWriter, req *http.Request) {

	vars := mux.Vars(req)

	ProductIDStr := vars["id"]
	ProductID, err := strconv.ParseUint(ProductIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid PrdouctID %v", ProductID))
		return
	}

	var body domain.Product

	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	body.Idproducts = ProductID

	if _, err := domain.EditProductByID(body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, body)
}

//DeleteProductByID deletes product
func DeleteProductByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	ProductIDStr := vars["id"]
	ProductID, err := strconv.ParseUint(ProductIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid ProductID %v", ProductID))
		return
	}

	if err = domain.DeleteProductByID(ProductID); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, ProductID)
}
