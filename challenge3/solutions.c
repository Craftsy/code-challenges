// solution 1
main(m){while((m=getchar())+1)putchar(!!isalpha(m)*((m|32)<'n'?13:-13)+m);}

// solution 1 - notated
#include <stdio.h>
#include <ctype.h>

int main() {
	int input = getchar();
	while (input != EOF) {
		// 0 if non-alpha, non-0 if alpha
		int alpha = isalpha(input);

		// Observation 1
		// a-z = 97 - 122 (ASCII)
		// A-Z = 65 - 90  (ASCII)
		// In ASCII, character code of uppercase and lowercase letters are 
		// separated by 32. Specifically, any upper case letter + 32 equals 
		// that same letter in lower case

		// Observation 2
		// The 6th bit (bit #5 in 0-index) in the ASCII code for every lowercase letter is set (1)
		// The 6th bit (bit #5 in 0-index) in the ASCII code for every uppercase letter is unset (0)

		// Observation 3
		// 2^5 = 32
		// value with only 5th bit set has base 10 value 32
		// 00100000 = 32

		// Conclusion
		// If we OR any lowercase alpha character with 32, it has no change 
		// since the 5th bit is already set in each letter
		// If we OR any uppercase alpha character with 32, it becomes the
		// lowercase equivalent of the starting character (equivalent of adding 32
		// in this special case)

		// input is uppercase => lowered == lower(input)
		// input is lowercase => lowered == lower(input) == input
		// input is non-alpha => lowered == dont_care
		int lowered = input | 32;

		// input is A-M or a-m => rot13(input) = input + 13
		// input is N-Z or n-z => rot13(input) = input - 13
		// input is non-alpha => no rotation
		int potential_rotation;
		if (lowered <= 'm') {
			// letters A-M rotate by increasing ASCII code by 13
			potential_rotation = 13;
		} else {
			// letters N-Z rotate by decreasing ASCII code by 13
			potential_rotation = -13;
		}

		// Convert alpha into 0 or 1 indicator of alpha-ness
		int alpha_zero_one;
		if (alpha == 0) {
			// non-alpha character
			alpha_zero_one = 0;
		} else {
			// alpha character
			alpha_zero_one = 1;
		}

		// Perform any required rotation:
		// input is A-Ma-m => rot13 = input + 1 * 13 = input + 13
		// input is N-Zn-z => rot13 = input + 1 * -13 = input - 13
		// input is non-alpha => rot13 = input + 0 * ±13 = input
		int rot13 = input + alpha_zero_one * potential_rotation;

		// Output rot13
		putchar(rot13);

		// Read next char
		input = getchar();
	}
}

/////////////////////////////////////
// Code golf shortened version:
//
// main(m){while((m=getchar())+1)putchar(!!isalpha(m)*((m|32)<'n'?13:-13)+m);}
//
// tricks:
//
// main(m) instead of int main(){int m;}
//    * main(m) is allowed as a K&R function with identifier list (as opposed to a parameter type list)
//    * m with type is implicitly an int
//
// while((m=getchar())+1)
//    * EOF == -1 so when EOF char is read (and only on EOF) this evaluates to 0 which exits the while
//
// !!isalpha(m)
//    * isalpha(m) returns 0 or non-zero but I want 0 or 1
//    * !isalpha(m) is 0 when alpha or 1 when non-alpha
//    * !!isalpha(m) is 0 when non-alpha or 1 when alpha
//
// no #includes
//    * uses implicit declaration
/////////////////////////////////////
