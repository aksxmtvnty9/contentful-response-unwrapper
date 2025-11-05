import { Nullishable } from './types/utils';

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

export const forceObject = <T extends Nullishable<Record<string, unknown>>>(obj: T) => {
  if (isObject(obj)) {
    return obj as NonNullable<T>;
  }

  return {} as NonNullable<T>;
};

export const getFields = <T extends Nullishable<Record<string, unknown>>>(data: T) => {
  const dataObj = forceObject(data);

  if ('fields' in dataObj && isObject(dataObj.fields)) {
    return dataObj.fields as NonNullable<T>;
  }

  return {} as NonNullable<T>;
};

export const getContentType = <T extends Nullishable<Record<string, unknown>>>(data: T) => {
  const dataObj = forceObject(data);

  if (!('sys' in dataObj) || !isObject(dataObj.sys)) {
    return '';
  }

  if (
    'type' in dataObj.sys &&
    typeof dataObj.sys.type === 'string' &&
    dataObj.sys.type.length > 0
  ) {
    return dataObj.sys.type;
  }

  if (
    'contentType' in dataObj.sys &&
    isObject(dataObj.sys.contentType) &&
    'sys' in dataObj.sys.contentType &&
    isObject(dataObj.sys.contentType.sys) &&
    'id' in dataObj.sys.contentType.sys &&
    typeof dataObj.sys.contentType.sys.id === 'string' &&
    dataObj.sys.contentType.sys.id.length > 0
  ) {
    return dataObj.sys.contentType.sys.id;
  }

  return '';
};
