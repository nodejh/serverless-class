package main

import (
   "fmt"
   "net/http"
   "runtime"
)

func HelloHandler(w http.ResponseWriter, r *http.Request) {
   fmt.Fprintf(w, "Hello Serverless! This is Golang runtime, version: %s", runtime.Version())
}

func main () {
   http.HandleFunc("/", HelloHandler)
   http.ListenAndServe(":8080", nil)
}
