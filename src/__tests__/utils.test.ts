import { forceObject, getContentType, getFields, isObject } from '../utils';

describe('isObject', () => {
  test.each([null, undefined, [], 'string', 42, true, NaN, () => {}])(
    `should return false for input '%s'`,
    (input) => {
      expect(isObject(input)).toBe(false);
    },
  );

  test.each([{ a: 1 }, { key: 'value' }, { nested: { b: 2 } }])(
    `should return true for input '%s'`,
    (input) => {
      expect(isObject(input)).toBe(true);
    },
  );
});

describe('forceObject', () => {
  test.each([null, undefined, [], 'string', 42, true, NaN, () => {}])(
    `should return empty object for input '%s'`,
    (input) => {
      expect(forceObject(input as any)).toEqual({});
    },
  );

  test.each([{ a: 1 }, { key: 'value' }, { nested: { b: 2 } }])(
    `should return the same object for input '%s'`,
    (input) => {
      expect(forceObject(input)).toEqual(input);
    },
  );
});

describe('getFields', () => {
  test.each([{ noFields: 123 }])(
    `should return empty object when input '%s' does not have 'fields' key`,
    (input) => {
      expect(getFields(input)).toEqual({});
    },
  );

  test(`should return fields object when present`, () => {
    const input = {
      fields: { a: 1, b: 2 },
      sys: { id: '123' },
    };

    expect(getFields(input)).toEqual({ a: 1, b: 2 });
  });
});

describe('getContentType', () => {
  test.each([
    { noSys: 123 },
    { sys: 'notAnObject' },
    { sys: {} },
    { sys: { type: 123 } },
    { sys: { contentType: 'notAnObject' } },
    { sys: { contentType: { sys: 'notAnObject' } } },
    { sys: { contentType: { sys: { id: 123 } } } },
  ])(`should return empty string when input '%s' does not have valid content type`, (input) => {
    expect(getContentType(input)).toBe('');
  });

  test.each([
    [{ sys: { type: 'ExampleType' } }, 'ExampleType'],
    [{ sys: { contentType: { sys: { id: 'ExampleContentType' } } } }, 'ExampleContentType'],
  ])(`should return correct content type for input '%s'`, (input, expected) => {
    expect(getContentType(input)).toBe(expected);
  });
});
