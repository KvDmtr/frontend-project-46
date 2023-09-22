import _ from 'lodash';

const padLine = (depth, spacesCount = 4) => `${' '.repeat(depth * spacesCount - 2)}`;
const padBracket = (depth, spacesCount = 4) => `${' '.repeat(spacesCount).repeat(depth)}`;
const getLine = (key, value, char, depth) => `${padLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${padBracket(depth)}}`;
const chars = { added: '+ ', removed: '- ', unchanged: '  ' };

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const entrise = Object.entries(value);
  const items = entrise.map(([key, val]) => getLine(key, stringify(val, depth + 1), '  ', depth + 1));
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
    switch (type) {
      case 'updated':
        return [getLine(key, stringify(value.oldValue, depth + 1), chars.removed, depth + 1),
          getLine(key, stringify(value.newValue, depth + 1), chars.added, depth + 1)];

      case 'nested':
        return getLine(key, parseDiff(children, depth + 1), '  ', depth + 1);

      case 'unchanged':
        return getLine(key, stringify(value, depth + 1), chars[type], depth + 1);

      case 'added':
        return getLine(key, stringify(value, depth + 1), chars[type], depth + 1);

      case 'removed':
        return getLine(key, stringify(value, depth + 1), chars[type], depth + 1);

      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  });
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const formatStylish = (diff) => parseDiff(diff, 0);

export default formatStylish;
