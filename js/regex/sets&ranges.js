// Set [...] -> search for any character in a set
// [aeiou] matches any of the five characters: 'a', 'e', 'i', 'o' and 'u'

const setMatch = () => {
  let str = "How cats, rats, and bats became Halloween animals";
  let re = /[cbr]ats/g;
  let results = str.match(re);

  console.log(results);
};

// Range [...] -> can contain character ranges.
// [a-z] is a character range from a to z. ([a-zA-Z0-9_] is the same as \w)
// [0-9] is a digit from 0 to 9 ([0-9] is the same as \d)
// negate a range (![...]) => [^...]

// Flag u -> add if a set has surrogate pair(e.g. emojis)
const surrogateMatch = () => {
  let result = "It is 🍎".match(/[🍎🍅🍓]/u);

  console.log(result);
};
surrogateMatch();
