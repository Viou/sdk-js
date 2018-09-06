import flattenObject from './flattenObject';

const required = field => {
  throw new Error(`${field} is required and was not provided`);
};

export default (
  spaceId = required('spaceId'),
  params = {},
  formAttributes = {}
) => {
  const mergedOptions = Object.assign(
    {
      method: 'post',
      action: `/ms/api/availity/internal/spaces/magneto/sso/v1/saml/${spaceId}`,
      target: '_blank',
    },
    formAttributes
  );
  const form = document.createElement('form');
  Object.keys(mergedOptions).forEach(key => {
    form.setAttribute(key, mergedOptions[key]);
  });
  const flat = flattenObject(params);
  const fields = Object.keys(flat)
    .map(key => {
      const name = key.replace(/\[\d+\]/g, '[]');
      const value = flat[key];
      return `<input type="hidden" name="${name}" value="${value}" />`;
    })
    .join('');

  form.insertAdjacentHTML('beforeend', fields);
  document.body.appendChild(form);
  form.submit();
};