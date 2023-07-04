import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const diff = keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], state: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], state: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], state: 'unchanged' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: buildDiff(data1[key], data2[key]), state: 'nested' };
    }
    return { key, value: { oldValue: data1[key], newValue: data2[key] }, state: 'updated' };
  });

  return diff;
};

export default buildDiff;
