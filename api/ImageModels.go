package api

type ImagesRequest struct {
	Ingredients []string
	Images      []string
}

type Image struct {
	Ingredients []string
	Data        []byte
}
