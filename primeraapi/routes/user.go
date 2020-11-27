package routes

import (
	"api/server"
	"net/http"

	"github.com/gorilla/mux"
)

//AppendUserRoutes Appends the routes to the `/user` router
func AppendUserRoutes(router *mux.Router) {
	router.HandleFunc("/", server.CreateUser).Methods(http.MethodPost)
	router.HandleFunc("/", server.SelectAllUsers).Methods(http.MethodGet)
	router.HandleFunc("/{id:[\\d]+}", server.EditUserByID).Methods(http.MethodPut)
	router.HandleFunc("/{id:[\\d]+}", server.DeleteUserByID).Methods(http.MethodDelete)

}
