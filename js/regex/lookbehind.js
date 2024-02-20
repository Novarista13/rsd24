// match X only if there is Y before it => (?<=Y)X

const getCost = () => {
  const s = "1 computer costs $900";
  const pattern = /(?<=\$)\d+/;

  const match = s.match(pattern);
  console.log(match);
};

// negative lookbehind
// matches X only if there is no Y before it => (?<!Y)X

const getComputerCount = () => {
  const s = "1 computer costs $900";
  const pattern = /(?<!\$)\d+/;

  const match = s.match(pattern);
  console.log(match);
};
getComputerCount();
