package main

import (
	"fmt"
	"unsafe"
)

/* 4 tipos de datos:
Basicos:numeros, string y boolean
Conjuntos o set: Arrays o Struc
Referencias: punteros, segmentos, map, funciones, canales
Interfaces */

// Enteros con signo  desde -128 a 127, y asi el resto
var entero8 int8
var entero16 int16
var entero32 int32
var entero64 int64

// enteros sin signo uint UNSIGNED INT, desde o a 255, solo numeros positivos
var uentero8 uint8
var uentero16 uint16
var uentero32 uint32
var uentero64 uint64

// alias
var enteroByte byte // alias para unit8
var enteroRune rune // alias para int32

// tipo dependiende de la plataforma (si la maquina soporta 32 o 64 bits)
var enteroUnit uint       // 32 o 64 bits
var enteroInt int         // 32 o 64 bits
var enteroUintptr uintptr // entero sin signo lo suficient grande para contener el valor de un puntero, sin numero definido

// conversion entre tipos

func main() {
	entero32 = 85
	entero64 = 25
	// asi se convierte el tipo, el parseo
	fmt.Println(entero32 + int32(entero64))

	// para los tipo rune no necesito hacer conversion de tipo
	enteroRune = 1
	entero32 = 2
	fmt.Println(entero32 + enteroRune)

	// no se puede sumar un int32 con un int porque el int pilla 64 por ser el ordeador asi
	enteroInt = 56
	entero32 = 3
	fmt.Println(unsafe.Sizeof(entero32), unsafe.Sizeof(enteroInt))

}
