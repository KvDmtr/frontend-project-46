const padLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const padBracket = (depth) => `${' '.repeat(4).repeat(depth)}`;
const getLine = (key, value, char, depth) => `${padLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${padBracket(depth)}}`;

const chars = { added: '+ ', removed: '- ', unchanged: '  ' };

const parseDiff = (diff, depth) => {
  const items = diff.flatMap(({ key, value, state }) => {
    if (state === 'updated') {
      return [getLine(key, value.oldValue, chars.removed, depth + 1),
        getLine(key, value.newValue, chars.added, depth + 1)];
    }
    return getLine(key, value, chars[state], depth + 1);
  });
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const formatStylish = (diff) => parseDiff(diff, 0);

export default formatStylish;
