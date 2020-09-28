import { getItemsFormObj, isExpire } from './utils';

test('utils isExpire should be true', () => {
  expect(isExpire('2020-09-05')).toBeTruthy();
  let newObj = getItemsFormObj({ a: 'a', b: 'b', c: 'c' }, ['a', 'b']);
  Object.keys(newObj).forEach((key, index) =>
    expect(key).toEqual(['a', 'b'][index]),
  );
});
