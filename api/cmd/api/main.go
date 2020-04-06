package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/vincent-petithory/dataurl"
	"github.com/whitenick/antipathy/api"
)

func submitImage(w http.ResponseWriter, r *http.Request) {
	(w.Header().Set("Access-Control-Allow-Origin", "*"))
	fmt.Println("submitForm endpoint hit...")
	l := r.URL
	fmt.Println(l)

	body := r.Body
	var newImage api.ImagesRequest
	if body == nil {
		fmt.Printf("Error: %s\n Request: %s\n", body, r.ContentLength)
		json.NewEncoder(w).Encode(body)
		return
	}

	json.NewDecoder(body).Decode(&newImage)
	var results []string
	fmt.Println(newImage)
	for i := 0; i < len(newImage.Images); i++ {
		imageDataString := newImage.Images[i]
		resolvedDataURL, err := dataurl.DecodeString(imageDataString)
		if err != nil {
			fmt.Println(err)
			json.NewEncoder(w).Encode(err)
			return
		}
		image := api.Image{
			Ingredients: newImage.Ingredients,
			Data:        resolvedDataURL.Data,
		}
		fmt.Println(image)
		result, err := api.ResolveImage(image)
		if err != nil {
			fmt.Println(err)
			json.NewEncoder(w).Encode(err)
			return
		}
		results = append(results, result)
	}

	json.NewEncoder(w).Encode(results)
	return
}

func apiLanding(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Ingredient List Analytics API (Made w/ Go)")
}

func main() {
	r := mux.NewRouter()
	fmt.Println("Hello")
	r.HandleFunc("/image-submit", submitImage)
	r.HandleFunc("/", apiLanding)
	log.Fatal(http.ListenAndServe(":8080", r))
}
