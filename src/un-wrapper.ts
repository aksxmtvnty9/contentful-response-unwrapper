import { Nullishable } from './types/utils';
import { forceObject, getContentType, getFields, isObject } from './utils';

export const unWrapper = <T extends Nullishable<Record<string, unknown>>>(response: T) => {
  const contentType = getContentType(response);

  if (!contentType) {
    return {} as NonNullable<T>;
  }

  let data: Record<string, unknown> = {};
  const fieldsInResponse = getFields(response);

  Object.keys(fieldsInResponse).forEach((key: string) => {
    const fieldData = fieldsInResponse[key];

    if (Array.isArray(fieldData)) {
      data[key] = fieldData.map((c: any) => unWrapper(c));

      return;
    }

    if (
      isObject(fieldData) &&
      Object.keys(fieldData).includes('sys') &&
      Object.keys(fieldData).includes('fields')
    ) {
      data[key] = unWrapper(forceObject(fieldData));
    }
  });

  return { contentType, ...data } as unknown as NonNullable<T>;
};
