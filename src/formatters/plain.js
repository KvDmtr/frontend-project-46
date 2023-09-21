import _ from 'lodash';

const prepareValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff, path = []) => {
  const output = diff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');
    switch (item.type) {
      case 'unchanged':
        return '';

      case 'removed':
        return `Property '${node}' was removed\n`;

      case 'added': {
        const val = prepareValue(item.value);
        return `Property '${node}' was added with value: ${val}\n`; }

      case 'updated': {
        const oldVal = prepareValue(item.value.oldValue);
        const newVal = prepareValue(item.value.newValue);
        return `Property '${node}' was updated. From ${oldVal} to ${newVal}\n`; }

      case 'nested':
        return formatPlain(item.children, newPath);

      default:
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  }).join('');

  return output;
};

export default formatPlain;
