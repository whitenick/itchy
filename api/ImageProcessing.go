package api

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"regexp"

	"cloud.google.com/go/translate"
	vision "cloud.google.com/go/vision/apiv1"
	"golang.org/x/text/language"
)

// GoogleCredPath ... Credential location
var GoogleCredPath = "/creds/Allergens-06533b7828a6.json"

// ResolveImage .. given image data w/ ingredients, resolve matches
func ResolveImage(image Image) (string, error) {
	var buf bytes.Buffer
	err := InitializeImageReader(&buf, image.Data)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	result, err := translateIngredients(buf)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	return result, nil
}

func GetCredPath() string {
	res, err := os.Getwd()
	if err != nil {
		return ""
	}
	return res + GoogleCredPath
}

func translateIngredients(buf bytes.Buffer) (string, error) {
	ctx := context.Background()
	client, err := translate.NewClient(ctx)
	if err != nil {
		return "", err
	}

	// get buffer as string
	scanner := bufio.NewScanner(&buf)
	scanner.Split(bufio.ScanWords)
	// Count the words.
	count := 0
	var wordBuffer bytes.Buffer
	var wordArray []string
	for scanner.Scan() {
		count++
		wordBuffer.WriteString(scanner.Text())
		wordArray = append(wordArray, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading input:", err)
	}
	fmt.Printf("%d\n", count)
	if err != nil {
		return "", err
	}
	// Set target language
	target, err := language.Parse("en")
	if err != nil {
		return "", err
	}
	translations, err := client.Translate(ctx, []string{wordBuffer.String()}, target, nil)
	if err != nil {
		return "", err
	}
	return translations[0].Text, nil
}

func cleanString(word string) string {
	reg, err := regexp.Compile("[^a-zA-Z0-9]+")
	if err != nil {
		log.Fatal(err)
	}
	processedString := reg.ReplaceAllString(word, " ")
	return processedString
}

// InitializeImageReader ... Parse nutrion list from stored image
func InitializeImageReader(w io.Writer, file []byte) error {
	ctx := context.Background()
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return err
	}
	image, err := vision.NewImageFromReader(bytes.NewBuffer(file))
	if err != nil {
		return err
	}
	annotations, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		return err
	}
	if len(annotations) == 0 {
		fmt.Fprintln(w, nil)
	} else {
		for _, annotation := range annotations {
			fmt.Fprintf(w, "%q\n", annotation.Description)
		}
	}
	return nil
}
