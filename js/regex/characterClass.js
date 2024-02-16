const digit = () => {
  // \d for digits
  let phone = "+1-(408)-555-0105";
  let re = /\d/g;

  // let number = phone.match(re);
  // let phoneNo = number.join("");

  // Short Form
  let phoneNo = phone.match(re).join("");

  console.log(phoneNo);
};

// \s for single white space such as a space, a tab (\t), a newline (\n)
// \w for words => ASCII character [A-Za-z0-9_]

const wordDigit = () => {
  // return word followed by a digit
  let str = "O2 is oxygen";
  let re = /\w\d/g;
  console.log(str.match(re));
};

// Inverse Classes
// \D (inverse of \d) – matches any character except a digit
// \S (inverse of \s) – matches any character except a whitespace
// \W (inverse of \w) – matches any character except a word character

const reverseDigit = () => {
  let phone = "+1-(408)-555-0105";
  let re = /\D/g;

  console.log(phone.replace(re, ""));
};

// dot (.) character class -> matches any character except a newline

const dotClass = () => {
  let re = /ES.6/s;
  console.log("ES\n6".match(re));
};
dotClass();
