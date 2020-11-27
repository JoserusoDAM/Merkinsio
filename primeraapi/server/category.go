package server

import (
	"api/domain"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// SelectAllCategories Metodo para realizar la peticion al servidor
func SelectAllCategories(w http.ResponseWriter, req *http.Request) {
	// declaro una varialbe que le asignara todas la categorias, que es el metodo que llama a la base de datos
	categories, err := domain.GetAllCategories()
	// si el error no es nulo te responde el error
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}
	// si todo va bien tira del metodo respondJSON y te devuelve las categorias
	respondWithJSON(w, http.StatusOK, categories)
}

// CreateCategory funcion para crear una categoria
func CreateCategory(w http.ResponseWriter, req *http.Request) {
	// esta variable es el body de categoria, como todos los campos que tenga
	var body domain.Category

	// comprueba que lo que le hemos pasado tiene los campos que corresponde
	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	_, err := domain.InsertCaterogy(body)
	if err != nil {
		badRequest(w, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, body)
}

// DeleteCategoryByID Funcion para eliminar una categoria
func DeleteCategoryByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	CategoryIDStr := vars["id"]
	CategoryID, err := strconv.ParseUint(CategoryIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid category %v", CategoryIDStr))
		return
	}
	// si intentas eliminar una categoria que no existe saltara error
	if err = domain.RemoveCategoryByID(CategoryID); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}
	respondWithJSON(w, http.StatusOK, CategoryID)
}

// EditCategoryByID funcion que elimina una categoria que recibe la peticion del servidor
func EditCategoryByID(w http.ResponseWriter, req *http.Request) {

	vars := mux.Vars(req)

	CategoryIDStr := vars["cid"]
	CategoryID, err := strconv.ParseUint(CategoryIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid CategoryID %v", CategoryID))
		return
	}

	var body domain.Category

	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	body.CID = CategoryID

	if _, err := domain.UpdateCategoryByID(body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, body)

}
