package app

import (
	"api/config"
	"api/domain"
	"api/routes"
	"database/sql"
	"net"
	"net/http"

	"github.com/gorilla/mux"
	negronilogrus "github.com/meatballhat/negroni-logrus"
	"github.com/rs/cors"
	"github.com/sirupsen/logrus"
	"github.com/urfave/negroni"
)

// App Structure that holds the application
type App struct {
	Router   *mux.Router
	DB       *sql.DB
	Listener net.Listener
}

// Initialize This function initialize the application router and context
func (a *App) Initialize() {
	a.Router = mux.NewRouter()

	// Gets the url from the database
	_ = domain.NewConnector(config.Config.GetString("database.url"))

	a.initializeRoutes()
}

// ShutDown This function cleans the context in the application
func (a *App) ShutDown() {
	if a.Listener != nil {
		a.Listener.Close()
	}
	a.DB.Close()
}

// Run This function starts the application at the designed port
func (a *App) Run(addr string) {
	var debug bool
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		panic(err.Error())
	}

	loggerLevel := logrus.ErrorLevel

	// Error handler
	recovery := negroni.NewRecovery()

	if config.Config.GetString("environment") == "development" {
		// Development
		logrus.Info("Using development mode")
		debug = true
		loggerLevel = logrus.DebugLevel
	} else {
		// Production
		recovery.PrintStack = false
		debug = false
	}

	// Security
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS", "PUT"},
		AllowCredentials: true,
		Debug:            debug,
	})

	// Logging
	logger := logrus.New()
	logger.Formatter = &logrus.TextFormatter{
		FullTimestamp: true,
	}
	logger.SetLevel(loggerLevel)

	n := negroni.New()
	n.Use(c)
	n.Use(negronilogrus.NewMiddlewareFromLogger(logger, "api"))
	n.Use(recovery)
	n.UseHandler(a.Router)

	a.Listener = listener
	logger.Fatal(http.Serve(a.Listener, n))
}

func (a *App) initializeRoutes() {

	// Define the main api path
	apiRouter := a.Router.PathPrefix("/api").Subrouter()

	productRouter := apiRouter.PathPrefix("/product").Subrouter()
	routes.AppendProductRoutes(productRouter)
	userRouter := apiRouter.PathPrefix("/user").Subrouter()
	routes.AppendUserRoutes(userRouter)
	categoryRouter := apiRouter.PathPrefix("/category").Subrouter()
	routes.AppendCategoryRoutes(categoryRouter)

}
