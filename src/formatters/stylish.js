import _ from 'lodash';

const padLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const padBracket = (depth) => `${' '.repeat(4).repeat(depth)}`;
const getLine = (key, value, char, depth) => `${padLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${padBracket(depth)}}`;

const prepareValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const entrise = Object.entries(value);
  const items = entrise.map(([key, val]) => getLine(key, prepareValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const parseDiff = (diff, depth) => {
  const items = diff.flatMap(({
    key,
    value,
    children,
    type,
  }) => {
    const chars = { added: '+ ', removed: '- ', unchanged: '  ' };
    switch (type) {
      case 'updated':
        return [getLine(key, prepareValue(value.oldValue, depth + 1), chars.removed, depth + 1),
          getLine(key, prepareValue(value.newValue, depth + 1), chars.added, depth + 1)];

      case 'nested':
        return getLine(key, parseDiff(children, depth + 1), '  ', depth + 1);

      case 'unchanged':
        return getLine(key, prepareValue(value, depth + 1), chars[type], depth + 1);

      case 'added':
        return getLine(key, prepareValue(value, depth + 1), chars[type], depth + 1);

      case 'removed':
        return getLine(key, prepareValue(value, depth + 1), chars[type], depth + 1);

      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  });
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const formatStylish = (diff) => parseDiff(diff, 0);

export default formatStylish;
