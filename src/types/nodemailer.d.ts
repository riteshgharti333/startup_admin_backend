declare module 'nodemailer' {
  import { Options, SentMessageInfo } from 'nodemailer';

  export interface Transporter {
    sendMail(mailOptions: any): Promise<SentMessageInfo>;
    close(): void;
  }

  export function createTransport(
    options: Options | string,
    defaults?: Options
  ): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export default nodemailer;
}