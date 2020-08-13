const AjaxState = () => {
  const ajaxState = {
    isLoading: false,
    hasError: false,
    isFulfilled: false,
  };

  return ajaxState;
};

export const ajaxPending = () => ({
  isFulfilled: false,
  isLoading: true,
  hasError: false,
});

export const ajaxFulfilled = () => ({
  isFulfilled: true,
  isLoading: false,
  hasError: false,
});

export const ajaxRejected = () => ({
  isFulfilled: false,
  isLoading: false,
  hasError: true,
});

export default AjaxState;
