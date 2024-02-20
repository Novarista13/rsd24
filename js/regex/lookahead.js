// allows you to match X but only if it is followed by Y => X(?=Y)

const getFeet = () => {
  const s = "1 car is 15 feet long";
  const pattern = /\d+(?=\s*feet)/;

  const match = s.match(pattern);
  console.log(match);
};

// multiple lookaheads
//  X(?=Y)(?=Z) matches X followed by Y and Z simultaneously.

// negative lookaheads
//  matches X only if it is not followed by Y => X(?!Y)

const getCar = () => {
  const s = "1 car is 15 feet long";
  const pattern = /\d+(?!\s*feet)/;

  const match = s.match(pattern);
  console.log(match);
};
getCar();
