package routes

import (
	"api/server"
	"net/http"

	"github.com/gorilla/mux"
)

//AppendProductRoutes Appends the routes to the `/product` router
func AppendProductRoutes(router *mux.Router) {
	router.HandleFunc("/", server.CreateProduct).Methods(http.MethodPost)
	router.HandleFunc("/", server.SelectAllProducts).Methods(http.MethodGet)
	router.HandleFunc("/{id:[\\d]+}", server.EditProductByID).Methods(http.MethodPut)
	router.HandleFunc("/{id:[\\d]+}", server.DeleteProductByID).Methods(http.MethodDelete)
}
