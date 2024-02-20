//  allow you to reference the capturing groups in the regular expression, like variables in regular expressions
// => \N (N is an integer that represents the corresponding capturing group number.)

const backRefEx1 = () => {
  const s = "JavaScript JavaScript is cool";
  const pattern = /(\w+)\s\1/;

  const result = s.replace(pattern, "$1");

  console.log(result);
};

const quoteRef = () => {
  const message = `"JavaScript's cool". They said`;
  const pattern = /([\'"]).*?\1/;

  const match = message.match(pattern);

  console.log(match[0]);
};

const wordRef = () => {
  const words = ["apple", "orange", "strawberry"];
  const pattern = /\w*(\w)\1\w*/;

  for (const word of words) {
    const result = word.match(pattern);
    if (result) {
      console.log(result[0], "->", result[1]);
    }
  }
};
wordRef();
