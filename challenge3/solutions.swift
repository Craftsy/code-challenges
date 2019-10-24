// solution 1
import UIKit

var scalarOffset: UInt32 = 65
let upperCaseOffset: UInt32 = 65
let lowerCaseOffset: UInt32 = 97
let rotationOffset: UInt32 = 13
var maxScalar: UInt32 = scalarOffset + 26

func rotateThoseLetters(_ string: String) -> String {
    var returnString = String()
    
    for letter in Array(string) {
        // Determine the UInt32 value of the letter in Unicode
        let startingValue = Unicode.Scalar(String(letter))!.value
        
        // Determine if the letter is uppercase or lowercase (based on the Unicode scalar value)
        if startingValue >= lowerCaseOffset {
            scalarOffset = lowerCaseOffset
        } else {
            scalarOffset = upperCaseOffset
        }
        
        // Know a max so we can rotate past Z or z and also determine if there is a special character
        maxScalar = scalarOffset + 26
        
        // If a special character, append that without rotating
        if startingValue > maxScalar || startingValue < scalarOffset {
            returnString.append(String(letter))
            continue
        }

        var newValue = startingValue + rotationOffset

        // Determine if we need to rotate past Z
        if newValue > maxScalar {
            newValue = ((newValue - maxScalar) + scalarOffset)
        }

        let rotatedLetter = Unicode.Scalar(newValue)!
        
        returnString.append(String(rotatedLetter))
    }
   
    return returnString
}

print(rotateThoseLetters("Hello world!"))
print(rotateThoseLetters("a"))
print(rotateThoseLetters("T"))
print(rotateThoseLetters("Q&A"))
print(rotateThoseLetters("ABC... easy as 123"))
