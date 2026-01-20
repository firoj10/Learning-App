"use server";

// import { headers } from "next/headers";
// import { formatAmountForStripe } from "@/lib/stripe-helpers";
// import { stripe } from "@/lib/stripe";

// const CURRENCY = "usd";

// export async function createCheckoutSession(data: any) {
//     const ui_mode = "hosted";
// console.log(
//   "STRIPE KEY:",
//   process.env.STRIPE_SECRET_KEY?.slice(0, 5)
// );

//     const origin = (await headers()).get("origin");

//     const checkoutSession = await stripe.checkout.sessions.create({
//         mode: "payment",
//         submit_type: "auto",
//         line_items: [
//             {
//                 quantity: 1,
//                 price_data: {
//                     currency: CURRENCY,
//                     product_data: {
//                         name: "How To Be Happy",
//                     },
//                     unit_amount: formatAmountForStripe(1000, CURRENCY),
//                 },
//             },
//         ],
//         ...(ui_mode === "hosted" && {
//             success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=12445`,
//             cancel_url: `${origin}/courses`,
//         }),
//         ui_mode,
//     });

//     return {
//         client_secret: checkoutSession.client_secret,
//         url: checkoutSession.url,
//     };
// }

// export async function createPaymentIntent(data: any) {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: formatAmountForStripe(1000, CURRENCY),
//         automatic_payment_methods: { enabled: true },
//         currency: CURRENCY,
//     });

//     return { client_secret: paymentIntent.client_secret };
// }

import { headers } from "next/headers";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { stripe } from "@/lib/stripe";

const CURRENCY = "inr" as const;

type CheckoutSessionResult = {
  client_secret: string | null;
  url: string | null;
};

type PaymentIntentResult = {
  client_secret: string | null;
};

export async function createCheckoutSession(data: FormData): Promise<CheckoutSessionResult> {
  const ui_mode = "hosted" as const;

  // Next.js versions differ: headers() can be Promise<ReadonlyHeaders>
  const origin = (await headers()).get("origin");
  const courseId = data.get("courseId");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: data.get("courseName") as string,
          },
          unit_amount: formatAmountForStripe(
            data.get("coursePrice") as unknown as number,
            CURRENCY
          ),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data: FormData): Promise<PaymentIntentResult> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(
      data.get("coursePrice") as unknown as number,
      CURRENCY
    ),
    automatic_payment_methods: { enabled: true },
    currency: CURRENCY,
  });

  return { client_secret: paymentIntent.client_secret };
}
