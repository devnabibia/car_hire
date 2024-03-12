export const rtkErrors = (error) => {
  let errorMsg = "";
  if (error) {
    if ("status" in error) {
      "error" in error
        ? (errorMsg = error.error)
        : (errorMsg = JSON.parse(JSON.stringify(error.data)).msg);
    }
  }
  return errorMsg;
};
