import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const getFormat = (diff, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json: formatJson,
  };
  const formatter = formatters[formatName];
  return formatter(diff);
};

export default getFormat;
