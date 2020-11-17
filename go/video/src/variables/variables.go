package main

import (
	"fmt"
)

func main() {
	// el valor por defecto de un numero es 0, del string es "" flotat 0.0 boolean false
	var numero int
	numero = 25
	fmt.Println(numero)

	// este numero sustituye al primero, no es dinamico, es de tipado estatico
	// ahora numero apunta a 40 no a 25
	numero = 40
	fmt.Println(numero)

	/* el := solo se usa para la declaracion de nuevas variables
	para declarar una variable sin decirle el tipo, sigue siendo tipado estatico
	la forma larga seria */
	var nombre2 string = "Jose"
	// la forma corta
	nombre := "Pepe"

	// nombre := "Manolo"  esto no funciona, solo tendria que hacer nombre = "Manolo"

	// se pueden asignar dos valores a la vez manteniendo el tipo siempre, da error si intento otro tipo
	nombre, numero = "Rocio", 1
	fmt.Println(nombre)
	fmt.Println(numero)
	fmt.Println(nombre2)

	// toda variable debe ser usada, sino no deja compilar, obliga a usarla, asignar un valor NO es usarla
	nombre3, nombre := "Miguel", "Carlos"
	fmt.Println(nombre3, nombre)

	// VARIABLES 2
	// declarar variables
	numeros := 25
	_nombres := "Aasd"
	numeros25 := 124
	nombreUsuario := "CamelCase"
	// es case sensitive
	Numero := 123
	fmt.Println(numeros, _nombres, numeros25, nombreUsuario, Numero)

	// declarar varias variables
	// aqui no hay que hacer := hace uso del ducktyping, porque estoy haciendo uso de var
	var (
		personaje          = "Goku"
		enemigo1, enemigo2 = "Babidi", "Cell"
	)
	// puedo hacer o
	var numero3 int
	var numero4 = 66

	fmt.Println(personaje, enemigo1, enemigo2, numero3, numero4)

	/* Scope, las variables solo existen dentro de las funciones donde se crean
	pero si la creo fuera de todo en plan fuera de todas las funciones, es "global"
	para declararlas fuera de todo se debe usar VAR, con el := no deja fuera de una funcion */
	var razaGoku = "Saiyan"
	fmt.Println("La raza de Goku es " + razaGoku)

}
