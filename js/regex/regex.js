const regexTest = () => {
  // return boolean value if it found a match
  let re = /hi/i;
  let result = re.test("Hi John");
  console.log(result);
};

const regexMatch = () => {
  // return an array of all matches
  let message = "Hi, are you there? hi, HI...";
  let re = /hi/gi;

  let matches = [];
  let match;
  do {
    match = re.exec(message);
    if (match) {
      matches.push(match);
    }
  } while (match != null);

  console.dir(matches);
};

const strMatch = () => {
  // return an array of all matches
  let str = "Are you OK? Yes, I'm OK";
  let result = str.match(/ok/gi);
};

const strReplace = () => {
  // replace all occurences of ok case insensitively
  let result = str.replace(/OK/gi, "fine");
  console.log(result);
};
