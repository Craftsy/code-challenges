# Needle a in Haystack

We all know the saying about finding a needle in a haystack -- but how hard is it to find a needle in a haystack?
Let's find out.

Write a function that will take a parameter of a block of text that will be a haystack with a needle and will return a string position (column, row) of the needle. A haystack will be represented as a block of text hay will be the hash (`#`) symbol while a needle will be a pipe (`|`). Treat columns as capital letters and rows as 1 based indicies. New line characters will represent the end of a row.

For example:</br>
Input:</br>
"######\r\n</br>
 ###|##\r\n</br>
 ######\r\n"</br>

Output: "D2"</br>

* All input values will contain a haystack
* Haystacks will always contain 1 needle
* All newlines will be indicated by `\r\n`
* Any columns past 26 (i.e. past Z) will be prefixed by letters (e.g. column 27 would be AA & 34 would be AH)


Test Cases:</br>
This is not an exhaustive list of test cases, more may be added, but this should be representative.</br>

* "###\r\n##|\r\n###" -> "C2"
* "############################\r\n###########################|" -> "AB2"
* "|####\r\n#####\r\n#####" -> "A1"


Timebox: 2 hours coding time</br>
Mainstream languages only</br>
Answers due by Wednesday (11/06/2019)</br>

Submit Answers to: Submit responses to: https://docs.google.com/forms/d/e/1FAIpQLSdkY2KtZFp7VFlf5XVKdHrU70KjgycyipIPpxFC_W-AnwtsDQ/viewform