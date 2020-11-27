package routes

import (
	"api/server"
	"net/http"

	"github.com/gorilla/mux"
)

//AppendCategoryRoutes Appends the routes to the `/category` router
func AppendCategoryRoutes(router *mux.Router) {
	router.HandleFunc("/", server.CreateCategory).Methods(http.MethodPost)
	router.HandleFunc("/", server.SelectAllCategories).Methods(http.MethodGet)
	router.HandleFunc("/{id:[\\d]+}", server.EditCategoryByID).Methods(http.MethodPut)
	router.HandleFunc("/{id:[\\d]+}", server.DeleteCategoryByID).Methods(http.MethodDelete)
}
