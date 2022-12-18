// QQ 1
// {1,2,3,4}

// QQ2
// "refr"

// QQ3
// 0: {Array(3) => true}
// 1: {Array(3) => false}

// hasDuplicate
const hasDuplicate = (arr) => new Set(arr).size !== arr.length;

// vowelCount
vowelCount("awesome"); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount("Colt"); // Map { 'o' => 1 }

function isVowel(char) {
  return "aeiou".includes(char);
}

function vowelCount(str) {
  const vowelMap = new Map();
  for (let char of str) {
    let lowercaseChar = char.toLowerCase();
    if (isVowel(lowercaseChar)) {
      if (vowelMap.has(char)) {
        vowelMap.set(lowercaseChar, vowelMap.get(lowercaseChar) + 1);
      } else {
        vowelMap.set(lowercaseChar, 1);
      }
    }
  }
  return vowelMap;
}
