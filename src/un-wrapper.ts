export const getFields = (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'fields' in data) {
    return data.fields;
  }

  return {} as Record<string, unknown>;
};

export const unWrapper = (response: any): Record<string, any> | undefined => {
  const fields = getFields(response) as Record<string, any>;
  const keysOfFields = Object.keys(fields);
  const contentTypeName = response?.sys?.contentType?.sys?.id || '';
  const contentType = contentTypeName || response?.sys?.type || '';

  if (!contentType) {
    return undefined;
  }

  let data: Record<string, any> = {};

  keysOfFields.forEach((key: string) => {
    if (Array.isArray(fields[key])) {
      data[key] = fields[key].map((c: any) => unWrapper(c));
    }

    if (
      !Array.isArray(fields[key]) &&
      typeof fields[key] === 'object' &&
      Object.keys(fields[key]).includes('sys') &&
      Object.keys(fields[key]).includes('fields')
    ) {
      data[key] = unWrapper(fields[key]);
    }
  });

  return { contentType, ...data };
};
