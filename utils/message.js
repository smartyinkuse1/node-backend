const message = (message, status, data) => {
  let info = {
    message: message,
    status: status,
    data: {
        validation: data
    },
  };
  return info;
};
module.exports = message;
