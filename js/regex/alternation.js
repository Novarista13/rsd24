// use the pipe operator (|) to represent an alternation

const altEx1 = () => {
  const s = "JavaScript and JS";
  const pattern = /JavaScript|JS/g;
  const match = s.match(pattern);

  console.log(match);
};

const timeString = () => {
  const time = "05:30 31:62 23:45 26:99";
  const pattern = /([01]\d|2[0-3]):[0-5]\d/g;
  const match = time.match(pattern);

  console.log(match);
};
