export const handleResponse = (
  res: any,
  status: any,
  message: any,
  data = null
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
