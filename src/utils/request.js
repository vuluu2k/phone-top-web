import fetch from 'isomorphic-unfetch';

// const dev = process.env.NODE_ENV !== 'production';

export function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export function post(url, options = {}, data = {}) {
  options.body = objectToFormData(data);
  if (!options.method) options.method = 'post';
  return request(url, options);
}

export function put(url, options = {}, data = {}) {
  options.body = objectToFormData(data);
  if (!options.method) options.method = 'put';
  return request(url, options);
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || (response.status >= 400 && response.status < 500)) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function objectToFormData(obj, form, namespace) {
  let fd = form || new FormData();
  let formKey;
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }
      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}
