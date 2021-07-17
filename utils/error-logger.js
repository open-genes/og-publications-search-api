// TODO: error handling

export function errorLogger(error) {
  if (error.response) {
    // client received an error response (5xx, 4xx)
    console.error(error);
  } else if (error.request) {
    // client never received a response, or request never left
    console.error(error);
  } else {
    // anything else
    console.error(error);
  }
}
