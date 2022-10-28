package main

import (
	"os"

	"github.com/arturgumerov/fullgo/server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())

	router.POST("/entry/create", routes.AddEntry)
	router.GET("/entries", routes.GetEntries)
	router.GET("/entry/:id/", routes.GetEntryById)
	router.GET("/ingredient/:ingredient", routes.GetEntryByPhone)
	router.PUT("entry/update/:id", routes.UpdateEntry)
	router.PUT("/price/update/:id", routes.UpdatePrice)
	router.DELETE("/entry/delete/:id", routes.DeleteEntry)

	router.Run(":" + port)
}