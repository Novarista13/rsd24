// quantifiers match a number of instances of a character, group, or character class in a string.

// *	Match zero or more times.
// +	Match one or more times.
// ?	Match zero or one time.
// { n }	Match exactly n times.
// { n ,}	Match at least n times.
// { n , m }	Match from n to m times.

const exactCount = () => {
  let str = "ECMAScript 20 2020";
  // let re = /\d{4}/;
  // let re = /\d{2,4}/g;
  // let re = /\d{3,}/g;

  // start from 1
  let re = /\d+/g;

  let result = str.match(re);
  console.log(result);
};

const orQuantifier = () => {
  // 0?1 -> 0 or 1 and will match both 0 and 1
  let str = "Is this color or colour?";
  let re = /colou?r/g;
  let result = str.match(re);

  console.log(result);
};

const moreQuantifier = () => {
  // * -> zero or more, use to match a string followed by any word character
  let str = "JavaScript is not Java";
  let re = /Java\w*/g;

  let results = str.match(re);

  console.log(results);
};

// greedy Mode
const greedyQuantifier = () => {
  // quantifiers use the greedy mode by default.
  // greedy quantifiers match their preceding elements as much as possible to return the largest matches.

  const s = '<button type="submit" class="btn">Send</button>';
  // const pattern = /".+"/g; // ['"submit" class="btn"']

  // make it non-greedy
  const pattern = /".+?"/g; // ['"submit"', '"btn"']

  const result = s.match(pattern);
  console.log(result);
};
greedyQuantifier();

// non-greedy or mode
// *	*?	Match its preceding element zero or more times.
// +	+?	Match its preceding element one or more times.
// ?	??	Match its preceding element zero or one time.
// { n }	{ n }?	Match its preceding element exactly n times.
// { n ,}	{ n ,}?	Match its preceding element at least n times.
// { n , m }	{ n , m }?	Match its preceding element from n to m times.

const lazyQuantifier = () => {
  //   lazy quantifiers match their preceding elements as few as possible to return smallest possible matches.
  // use ? to transform a greedy quantifier into a lazy quantifier.
  
  const s = '<button type="submit" class="btn">Send</button>';
  const pattern = /".+?"/g; //['"submit"', '"btn"']

  const result = s.match(pattern);
  console.log(result);
};
