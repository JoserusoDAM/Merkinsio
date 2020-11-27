package server

import (
	"encoding/json"
	"net/http"
)

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

// esta función sirve para darle un encoding al json con los datos que le pasamos
func parseBody(r *http.Request, payload interface{}) error {
	// el NewDecoder devuelve un decoder que lee de r
	decoder := json.NewDecoder(r.Body)
	// entonces leemos el decoder, y lo guardamos en la variable
	if err := decoder.Decode(payload); err != nil {
		return err
	}
	defer r.Body.Close()
	return nil
}

func badRequest(w http.ResponseWriter, msg string) {
	respondWithError(w, http.StatusBadRequest, msg)
}
