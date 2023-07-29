const generateConfig = (url, accessToken) => {
  return {
    url: url,
    headers: {
      Authorization: 'Bearer ' + `${accessToken}`,
      "Content-type": "application/json",
    },
  };
};

module.exports = { generateConfig };
