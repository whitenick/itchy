package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

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
		fmt.Println(body)
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
			return
		}
		results = append(results, result)
	}

	json.NewEncoder(w).Encode(results)
	return
}

func main() {
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", api.GoogleCredPath)
	r := mux.NewRouter()
	fmt.Println("Hello")
	r.HandleFunc("/image-submit", submitImage)

	// var buf bytes.Buffer
	// error := parseNutritionList(&buf, "./images/IMG_4172.heic")
	// fmt.Print(error)
	// newError := translateIngredients(buf)
	// fmt.Print(newError)

	log.Fatal(http.ListenAndServe(":8080", r))
}