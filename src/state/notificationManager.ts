import { NotificationManager } from "react-notifications";

export const createNotification = (
  messageType: string,
  messageText: string,
  messageTitle: string,
  timeout: number,
  txId?: string
) => {
  return NotificationManager[messageType](
    messageText,
    messageTitle,
    timeout,
    () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      txId ? window.open(
        `https://explorer.solana.com/tx/${txId}?cluster=devnet`,
        "_blank"
      ) : null;
    }
  );
};
