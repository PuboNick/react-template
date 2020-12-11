let hexTable = (function() {
  let array = [];
  for (let i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }
  return array;
})();

/**
 * url 編碼
 * @param str url params
 * @param charset 編碼格式
 */
export function encode(str: string, charset?: string) {
  if (str.length === 0) {
    return str;
  }
  let string = str;
  if (typeof str === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }
  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
    });
  }
  let out = '';
  for (let i = 0; i < string.length; ++i) {
    let c = string.charCodeAt(i);
    if (
      c === 0x2d || // -
      c === 0x2e || // .
      c === 0x5f || // _
      c === 0x7e || // ~
      (c >= 0x30 && c <= 0x39) || // 0-9
      (c >= 0x41 && c <= 0x5a) || // a-z
      (c >= 0x61 && c <= 0x7a) // A-Z
    ) {
      out += string.charAt(i);
      continue;
    }
    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 0x800) {
      out = out + (hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)]);
      continue;
    }
    if (c < 0xd800 || c >= 0xe000) {
      out =
        out +
        (hexTable[0xe0 | (c >> 12)] +
          hexTable[0x80 | ((c >> 6) & 0x3f)] +
          hexTable[0x80 | (c & 0x3f)]);
      continue;
    }
    i += 1;
    c = 0x10000 + (((c & 0x3ff) << 10) | (string.charCodeAt(i) & 0x3ff));
    out +=
      hexTable[0xf0 | (c >> 18)] +
      hexTable[0x80 | ((c >> 12) & 0x3f)] +
      hexTable[0x80 | ((c >> 6) & 0x3f)] +
      hexTable[0x80 | (c & 0x3f)];
  }
  return out;
}
