// { url: DATA/SERVER
//   method: 'POST/GET',
//   body: {},
//   onSuccess: () => initPins()
//   onError: () => showLoadDataError()
// }

const api = (params) => {
  const init = {
    method: params.method,
  };
  if (params.body) {
    init.body = new FormData(params.body);
  }
  fetch(params.url, init)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response);
    }
  })
  .then((response) => {
    if (params.onSuccess) {
      params.onSuccess(response);
    }
  })
  .catch((error) => {
    if (params.onError) {
      params.onError(error);
    }
  });
};

export {api};
