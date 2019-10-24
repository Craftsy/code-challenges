// solution 1
const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const getLetter = (l) => {
    let rl = abc.indexOf(l) + 13;
    if (rl >= 26)
        rl -= 26;
    return abc[rl];
};

const rot13 = (str) => {
    let output = '';
    for(let c of str.split('')) {
        let rl = c;
        if (abc.includes(c)) {
            rl = getLetter(c);
        } else if (abc.includes(c.toLowerCase())) {
            rl = getLetter(c.toLowerCase()).toUpperCase();
        }
        output += rl;
    }

    return output;
}

console.log(rot13('ABC... easy as 123'));

// solution 2
const CHARSETS = {
    lower: 'a-z',
    upper: 'A-Z',
};

const CHAR_BOUNDARIES = Object.keys(CHARSETS).reduce((boundaries, setName) => {
    boundaries[setName] = CHARSETS[setName].split('-').map(s => s.charCodeAt(0));
    return boundaries;
}, {});

const challenge = str => str.split('').map(char => {
    const charCode = char.charCodeAt(0);
    const set = char === char.toUpperCase() ? 'upper' : 'lower';

    const [start, end] = CHAR_BOUNDARIES[set];
    const count = end - start + 1;

    const outCode = charCode + count / 2;
    const adjustedOutCode = outCode > end ? outCode - count : outCode;

    return String.fromCharCode(adjustedOutCode)
}).join('');

// solution 3
const CHAR_MAP = ['a', 'z'].map(l => l.charCodeAt(0)).reduce((a, z) => {
    const map = {};
    const halfCount = (z - a + 1) / 2;
    for (let i = a; i < halfCount + a; i++) {
        const chars = [i, i + halfCount].map(l => String.fromCharCode(l));

        [chars, chars.slice().reverse()]
            .flatMap(pair => [pair, pair.map(s => s.toUpperCase())])
            .forEach(([first, second]) => {
                map[first] = second;
            });
    }

    return map;
});

const challenge = str => {
    let out = '';
    for (let l of str) {
        out += CHAR_MAP[l] || l;
    }
    return out;
};

// solution 4
function rot13(input) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const validLetters = /^[A-Za-z]+$/;
    let updatedLettersArray = [];
    
    input.split('').forEach(letter => {
      let updatedLetter = letter;
      
      if(letter.match(validLetters)) {
        let newLetterIndex = alphabet.indexOf(letter.toLowerCase()) + 13;
        newLetterIndex = newLetterIndex > 26 ? newLetterIndex - 26 : newLetterIndex;
        updatedLetter = letter === letter.toUpperCase() ? alphabet[newLetterIndex].toUpperCase() : alphabet[newLetterIndex];
      }
  
      return updatedLettersArray = [...updatedLettersArray, updatedLetter];
    })
    return updatedLettersArray.join("");
  }

  // solution 5
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const rotAlpha = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
let strToRot = 'ABC... easy as 123'
let rottedString = [];
​
function rot13(strToRot) {
  for (var i = 0; i < strToRot.length; i++) {
    if (strToRot[i].match(/[a-z]/i)) {
      charToPush = rotAlpha[alphabet.indexOf(strToRot[i])]
      rottedString.push(charToPush)
    } else {
      rottedString.push(strToRot[i]);
    }
​
  }
  rottedString = rottedString.join('');
  console.log(rottedString)
}
​
rot13(strToRot);

// solution 6
//Global variables defined
let alphaString = [];
let rotAlphaString = [];
let strToRot = 'ABC... easy as 123'
let rottedString = [];


//rot13 function begins here

function rot13() {
  //Function that generates regular alphabet variable
  (function createAlphabet() {
    const alphabetRanges = {
      capsRange: ['A'.charCodeAt(0), 'Z'.charCodeAt(0)],
      lowerRange: ['a'.charCodeAt(0), 'z'.charCodeAt(0)]
    }

    Object.keys(alphabetRanges).map(function(rangeNumber) {
      let ranges = alphabetRanges[rangeNumber]
      for (var i = ranges[0]; i <= ranges[1]; i++) {
        alphaString.push(String.fromCharCode(i))
      }

    });
    alphaString = alphaString.join('')
    return alphaString
  }());

  (function createRotAlpha() {
    const rotAlphaRanges = {
      capsRange1: ['N'.charCodeAt(0), 'Z'.charCodeAt(0)],
      capsRange2: ['A'.charCodeAt(0), 'M'.charCodeAt(0)],
      lowerRange1: ['n'.charCodeAt(0), 'z'.charCodeAt(0)],
      lowerRange2: ['a'.charCodeAt(0), 'm'.charCodeAt(0)]
    }

    Object.keys(rotAlphaRanges).map(function(rangeNumber) {
      let ranges = rotAlphaRanges[rangeNumber]
      for (var i = ranges[0]; i <= ranges[1]; i++) {
        rotAlphaString.push(String.fromCharCode(i))
      }

    });
    rotAlphaString = rotAlphaString.join('');
    return rotAlphaString;
  }());

  //actual rot13 translation happens here
  for (var i = 0; i < strToRot.length; i++) {
    if (strToRot[i].match(/[a-z]/i)) {
      charToPush = rotAlphaString[alphaString.indexOf(strToRot[i])]
      rottedString.push(charToPush)
    } else {
      rottedString.push(strToRot[i]);
    }
  }
  rottedString = rottedString.join('');
  return rottedString;

};
rot13();
console.log(rottedString);

// solution7
function rot13(message) {
    let newMessage = '';
    for (let i = 0; i < message.length; i++) {
      let currentCharacter = message.charAt(i);    
      if (currentCharacter.match(/^[A-Za-z]+$/)) {
        currentCharacter = String.fromCharCode(currentCharacter.charCodeAt() + 13)      
      }
      newMessage = newMessage + currentCharacter
    }
    // console.log(newMessage)
    return newMessage;
    
  }
  
  rot13('A');

  // solution 8
  function rot13 (str) {
    const alphaCheck = new RegExp(/[a-z]/, 'i'); // alpha case INsensitive
    let rotted = '';
    str.split('').forEach((char) => {
      if (alphaCheck.test(char)) {
        const unichar = char.charCodeAt(0);
        const potentialRot = unichar + 13;
        const start = unichar <= 'Z'.charCodeAt(0) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        rotted += (potentialRot >= start+26) ? // check if adding 13 goes beyond the 26 letter alphabet
          String.fromCharCode(start+(potentialRot)%(start+26)) :
          String.fromCharCode(potentialRot);
      } else {
        rotted += char;
      }
    });
    return rotted;
  }
  const rottingWorld = rot13('Hello world!');
  console.log(rottingWorld);
  console.log(`'Uryyb jbeyq!' === '${rottingWorld}'`, 'Uryyb jbeyq!' === rottingWorld);
  console.log('UnRottonWorld', rot13(rottingWorld));
  console.log(rot13('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'));

  // solution 9
function doTheThing(str) { // LBH QVQ VG!
    var cipherRes = []
    for (var i = 0; i < str.length; i++) {
        let charCodeA = 'a'.charCodeAt(0)

        if (str.charCodeAt(i) >= 65 && str.charCodeAt(i)+13 <= charCodeA) {
            cipherRes = cipherRes + String.fromCharCode(str.charCodeAt(i)+13)
        }
        else if (str.charCodeAt(i)+13 > charCodeA) {
            var newChar = str.charCodeAt(i)+13 - charCodeA + 64
            cipherRes = cipherRes + String.fromCharCode(newChar)
        }
        else {
            cipherRes = cipherRes + str[i]
        }

    }
    str = cipherRes
    return str
}

doTheThing('ABC... easy as 123')