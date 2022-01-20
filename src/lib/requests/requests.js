import axios from 'axios';

const sendRequest = async (metodh, url, params) => {

  const requestMetadata = {
    method: metodh,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  };


  const response = await fetch((process.env.REACT_APP_BACKEND_SERVER_URL + url), requestMetadata)
    .then((res) => res.json())
    .then(
      (data) => ({ data }),
      (error) => ({ error }),
    );
  return response;
};

const sendImageRequest = async (url, formData) => {
  const response = await axios.post((process.env.REACT_APP_BACKEND_SERVER_URL + url), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });

  return response
};

export { sendRequest, sendImageRequest }