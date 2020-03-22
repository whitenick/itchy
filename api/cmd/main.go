package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"

	// "bufio"
	"cloud.google.com/go/translate"
	vision "cloud.google.com/go/vision/apiv1"
	"github.com/vincent-petithory/dataurl"
	"golang.org/x/text/language"
)

var googleCredPath = "/Users/nickwhite/go/wingspan/api/creds/Allergens-06533b7828a6.json"

type ImagesRequest struct {
	Ingredients []string
	Images      []string
}

type Image struct {
	Ingredients []string
	Data        []byte
}

// func allArticles(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Enpoint Hit: All Articles Endpoint")
// 	// Articles = {Title: 'woke-up today', Desc: 'had an egg on my face', Content: 'dandyday'}
// 	var singleArticle = Article{
// 		Title:   "woke-up today",
// 		Desc:    "no combination of words",
// 		Content: "put on the back of a postcard",
// 	}

// 	newArticles := Articles{
// 		singleArticle,
// 	}
// 	json.NewEncoder(w).Encode(newArticles)
// }

func parseNutritionList(w io.Writer, file string) error {
	ctx := context.Background()

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return err
	}

	f, err := os.Open(file)
	if err != nil {
		return err
	}
	defer f.Close()

	image, err := vision.NewImageFromReader(f)
	if err != nil {
		return err
	}
	annotations, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		return err
	}

	if len(annotations) == 0 {
		fmt.Fprintln(w, "No Text Found")
	} else {
		fmt.Fprintln(w, "Text: ")
		for _, annotation := range annotations {
			fmt.Fprintf(w, "%q\n", annotation.Description)
		}
	}
	fmt.Print(w)
	return nil
}

func translateIngredients(buf bytes.Buffer) error {
	ctx := context.Background()
	client, err := translate.NewClient(ctx)

	fmt.Print("Translated Ingredients: \n")
	if err != nil {
		return err
	}

	// fmt.Print(&buf)
	fmt.Println()
	fmt.Print("Buffer Length", buf.Len(), "\n")
	// _, newToken, err := bufio.ScanLines(buf.Bytes(), false)
	// if err != nil {
	// 	return err
	// } else {
	// 	fmt.Print(string(newToken))
	// }

	for _, singleWord := range buf.Bytes() {
		fmt.Print(string(singleWord))
	}

	// get buffer as string
	textAsString := buf.String()
	// Set target language
	target, err := language.Parse("en")
	if err != nil {
		return err
	}

	// translate text to Russian
	translations, err := client.Translate(ctx, []string{textAsString}, target, nil)
	if err != nil {
		return err
	}
	fmt.Print("Translation: %v\n", translations[0].Text)
	return nil
}

func submitImage(w http.ResponseWriter, r *http.Request) {
	(w.Header().Set("Access-Control-Allow-Origin", "*"))
	fmt.Println("submitForm endpoint hit...")
	var requestBuffer bytes.Buffer
	l := r.URL
	fmt.Println(l)

	body := r.Body
	var newImage ImagesRequest
	if body == nil {
		fmt.Println(body)
		return
	}

	json.NewDecoder(body).Decode(&newImage)

	fmt.Println(newImage)
	for i := 0; i < len(newImage.Images); i++ {
		imageDataString := newImage.Images[i]
		resolvedDataURL, err := dataurl.DecodeString(imageDataString)
		if err != nil {
			fmt.Println(err)
			return
		}
		image := Image{
			Ingredients: newImage.Ingredients,
			Data:        resolvedDataURL.Data,
		}
		fmt.Println(image)
		// api.resolveImage(&image)
	}

	json.NewEncoder(w).Encode("Success")
	fmt.Print(requestBuffer.Bytes())

	return
}

func main() {
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", googleCredPath)
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
