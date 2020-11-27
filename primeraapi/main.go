package main

import (
	// Import the MySQL driver here because we want to use it here instead of main
	"api/app"
	"api/config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	app := app.App{}

	fmt.Println("Starting API")
	app.Initialize()
	defer app.ShutDown()

	fmt.Println("Server running at localhost:", config.Config.GetString("server.port"))
	app.Run(":" + config.Config.GetString("server.port"))
}
