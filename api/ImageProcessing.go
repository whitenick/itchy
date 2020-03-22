package api

import (
	"fmt"
	"io"
)

func parseImage(w io.Writer, file string) error {
	fmt.Print("Hello World")
	return nil
}

func resolveImage(image *Image) error {
	return nil
}
