# Implement the ROT13 Cipher

Cryptography, at it's simplest, is a process to transform data in way which obscures it from unintended parties but can still be consumed by the intended party. The ROT13 (Rotation by 13) cipher is one of the earliest and simplest (and worst) executions of this idea. Basically, our alphabet has 26 characters and we want to rotate it (in a circle) by 13. That means that the letter 'a' will be offset by 13 changing it to an 'n' and that when we get to the end of the alphabet we will circle back to the beginning of the alphabet and continue counting meaning that the letter `q` rotates to `d`.

Example: </br>
"Hello world!" -> "Uryyb jbeyq!" </br>

The nature of this cipher means that encoding and decoding are the same exact operation. </br>

Which means that: </br>
"Uryyb jbeyq!" -> "Hello world!"</br>

Any value put through a ROT13 twice should equal to the originating value. (e.g. `x == rot13(rot13(x))`) </br>

You can read more about it here: https://en.wikipedia.org/wiki/ROT13 </br>

## Create a function which performs a ROT13 on all characters in a given string.

* Input string will always have a valid value
* Capitalization must be maintained
* Any numbers, spaces or special characters should not be transformed but must be maintained in the response
* All instances of characters in the string should be transformed

## Test Cases
This is not an exhaustive list of test cases, more may be added, but this should be representative.</br>

* 'a' -> 'n'
* 'T' -> 'G'
* 'Q&A' -> 'D&N'
* 'ABC... easy as 123' -> 'NOP... rnfl nf 123'


Timebox: 1 hour coding time</br>
Mainstream languages only</br>
Answers due by Wednesday (10/23/2019)</br>

Submit Answers to: Submit responses to: https://docs.google.com/forms/d/e/1FAIpQLSdkY2KtZFp7VFlf5XVKdHrU70KjgycyipIPpxFC_W-AnwtsDQ/viewform