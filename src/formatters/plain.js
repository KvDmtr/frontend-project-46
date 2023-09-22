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
        return `\nProperty '${node}' was removed`;

      case 'added': {
        const val = prepareValue(item.value);
        return `\nProperty '${node}' was added with value: ${val}`; }

      case 'updated': {
        const oldVal = prepareValue(item.value.oldValue);
        const newVal = prepareValue(item.value.newValue);
        return `\nProperty '${node}' was updated. From ${oldVal} to ${newVal}`; }

      case 'nested':
        return `\n${formatPlain(item.children, newPath)}`;

      default:
        throw new Error(`Unknown type: '${item.type}'!`);
    }
  }).join('');

  return output.replace('\n', '');
};

export default formatPlain;
