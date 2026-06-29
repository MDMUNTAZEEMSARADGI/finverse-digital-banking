export const generateAccountNumber = () => {
  return "FV" + Date.now() + Math.floor(Math.random() * 1000);
};
