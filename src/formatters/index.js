import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormat = (diff, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json: JSON.stringify,
  };
  const formatter = formatters[formatName];
  return formatter(diff);
};

export default getFormat;
