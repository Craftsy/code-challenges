// Go Solutions to Bluprint Challenge 1


// Solution 1
import (
  "strconv"
  "fmt"
  "strings"
)

func f(n int) int64 {
	total := int64(1)
	s := strconv.Itoa(n)
 	arr := strings.Split(s, "")
	for _, elem := range arr {
		i,_ := strconv.ParseInt(elem,10,64)
		if i > 0 {
			total = total * i
		}
	}
	return total
}

func main() {
	fmt.Println(f(4969279))
}