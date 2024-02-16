// anchors allow you to match a position before or after characters

// ^ –> caret anchor matches the beginning of the text.
// $ –> dollar anchor matches the end of the text

const caretTest = () => {
  let str = "JavaScript";
  console.log(/t$/.test(str));
};

const formatTest = () => {
  let isValid = /^\d\d\:\d\d$/;
  console.log(isValid.test("12:05"));
};

const multilineMatch = () => {
  let str = `1st line
2nd line
3rd line
  `;

  let re = /^\d/gm;
  let matches = str.match(re);
  console.log(matches);
};

// \b ->
// before the first character in a string if the first character is a word character.
// after the last character in a string if the last character is a word character.
// between two characters in a string if one is a word character and the other is not.

const boundaryExample = () => {
  console.log("Hello, JS!".match(/\bJS\b/)); // [ "JS" ]
  console.log("Hello, JSscript!".match(/\bJS\b/)); // null
  console.log("ES 2015".match(/\b\d\d\d\d\b/)); // [ "2015" ]
};

const formatFind = () => {
  let str = "I start coding JS at 05:30 AM";
  let re = /\b\d\d\:\d\d\b/;
  let result = str.match(re);
  console.log(result);
};
formatFind();
