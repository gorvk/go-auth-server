package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorvk/rent-app/server/api-services/initializers"
	_ "github.com/gorvk/rent-app/server/api-services/routes"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectDB()
}

func main() {
	configureListenAndServe()
}

func addCorsHeaders(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		handler.ServeHTTP(w, r)
	})
}

func configureListenAndServe() {
	server := &http.Server{
		Addr:         ":9090",
		Handler:      addCorsHeaders(http.DefaultServeMux),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			fmt.Println(err)
		}
	}()

	osSignalChan := make(chan os.Signal)
	signal.Notify(osSignalChan, os.Interrupt, os.Kill)
	osSignal := <-osSignalChan
	fmt.Println("gracefully shutting down server due to :", osSignal)
	contextWithTimeout, cancelContext := context.WithTimeout(context.Background(), 30*time.Second)
	cancelContext()
	server.Shutdown(contextWithTimeout)
}
