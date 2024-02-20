// to create a capturing group for a rule, you place that rule in parentheses => (rule)

const ruleCapture = () => {
  const path = "posts/10";
  const pattern = /(\w+)\/(\d+)/;

  const match = path.match(pattern);
  console.log(match);
};

// use named capturing group to assign a name to a group => (?<name>rule)
const namedCapture = () => {
  const path = "posts/10";
  const pattern = /(?<resources>\w+)\/(?<id>\d+)/;

  const match = path.match(pattern);
  console.log(match);
};
namedCapture();
