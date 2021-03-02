import { getItemsFormObj, isExpire, setDebounce } from '.';

describe('utils test', () => {
  // isExpire 測試用例
  test('utils isExpire should be true', () => {
    expect(isExpire('2020-09-05')).toBeTruthy();
  });

  // getItemsFromObj 測試用例
  test('utils getItemsFromObj is work', () => {
    let newObj = getItemsFormObj({ a: 'a', b: 'b', c: 'c' }, ['a', 'b']);
    Object.keys(newObj).forEach((key, index) =>
      expect(key).toEqual(['a', 'b'][index]),
    );
  });

  // setDebounce 測試用例
  test('utils setDebounce should be run once', () => {
    const callback = jest.fn();
    let debounce = setDebounce(callback, 500);
    debounce.run('hello world');
    expect(callback).not.toBeCalled();
    debounce.run('hello ok');
    expect(callback).not.toBeCalled();
    debounce.run('hello test');

    setTimeout(() => {
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    }, 1000);
  });
});
