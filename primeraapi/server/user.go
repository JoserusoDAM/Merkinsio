package server

import (
	"api/domain"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// SelectAllUsers shows all the users
func SelectAllUsers(w http.ResponseWriter, req *http.Request) {
	users, err := domain.GetAllUsers()
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}
	respondWithJSON(w, http.StatusOK, users)
}

// CreateUser creates an user
func CreateUser(w http.ResponseWriter, req *http.Request) {
	var body domain.Users

	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	_, err := domain.InsertUser(body)
	if err != nil {
		badRequest(w, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, body)
}

// DeleteUserByID deletes an user
func DeleteUserByID(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	UserIDStr := vars["id"]
	UserID, err := strconv.ParseUint(UserIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid user %v", UserIDStr))
		return
	}
	if err = domain.RemoveUserByID(UserID); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
	}
	respondWithJSON(w, http.StatusOK, UserID)
}

// EditUserByID edit an user
func EditUserByID(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	UserIDStr := vars["cid"]
	UserID, err := strconv.ParseUint(UserIDStr, 10, 64)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, fmt.Sprintf("Invalid UserID %v", UserID))
		return
	}

	var body domain.Users

	if err := parseBody(req, &body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	body.UID = UserID

	if _, err := domain.UpdateuserByID(body); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	respondWithJSON(w, http.StatusOK, body)
}
