import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

/*
 [
    {
        to: "info@gmail.com",
        subject: "It is great",
        message: "ndkkdjfjd djfkldjfjdkl"
    },
    {
        to: "info@gmail.com",
        subject: "It is great",
        message: "ndkkdjfjd djfkldjfjdkl"
    }
 ]
*/

// export const sendEmails = async (emailInfo) => {
//     if (!emailInfo) return null;

//     const response = await Promise.allSettled(
//         emailInfo.map(async (data) => {
//           if (data.to && data.message && data.subject) {
//             const to = data.to;
//             const subject = data.subject;
//             const message = data.message;

//             const sentInfo = await resend.emails.send({
//               from: "onboarding@resend.dev",
//               // from: "noreply@noreply.tapascript.io",
//               to: to,
//               subject: subject,
//               react: EmailTemplate({ message }),
//             });
//             return sentInfo;
//           } else {
//             new Promise((reject) => {
//               return reject(
//                 new Error(`Couldn't send email, please check the ${JSON.stringify(data)}.`)
//               );
//             });
//           }
//         })
//       );
//     return response;
// };
export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        try {
          const sentInfo = await resend.emails.send({
            from: "onboarding@resend.dev", // use this for now
            to: data.to,
            subject: data.subject,
            react: EmailTemplate({ message: data.message }),
          });

          return sentInfo;
        } catch (err) {
          console.error("RESEND ERROR:", err); // <-- this is the key
          throw err;
        }
      }
      throw new Error(`Missing fields: ${JSON.stringify(data)}`);
    })
  );

  // also log clean reasons
  console.log(
    "SETTLED:",
    response.map((r) =>
      r.status === "rejected"
        ? { status: r.status, message: String(r.reason?.message || r.reason), name: r.reason?.name }
        : r
    )
  );

  return response;
};
