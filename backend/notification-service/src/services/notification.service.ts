import Notification from "../models/notification.model";

export const createNotification = async (
  userId: string,
  type: string,
  amount: number,
) => {
  let title = "";
  let message = "";

  switch (type) {
    case "DEPOSIT":
      title = "Deposit Successful";
      message = `₹${amount} deposited successfully`;
      break;

    case "WITHDRAW":
      title = "Withdrawal Successful";
      message = `₹${amount} withdrawn successfully`;
      break;

    case "TRANSFER":
      title = "Transfer Successful";
      message = `₹${amount} transferred successfully`;
      break;
  }

  return Notification.create({
    userId,
    type,
    title,
    message,
  });
};
