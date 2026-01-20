import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { sendEmails } from "@/lib/emails";
import { enrollForCourse } from "@/queries/enrollments";

type SuccessProps = {
  searchParams: Promise<{
    session_id?: string | string[];
    courseId?: string | string[];
  }>;
};

const Success = async ({ searchParams }: SuccessProps) => {
  const sp = await searchParams;

  const rawSessionId = sp.session_id;
  const rawCourseId = sp.courseId;

  const session_id = (Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId)?.trim();
  const courseId = (Array.isArray(rawCourseId) ? rawCourseId[0] : rawCourseId)?.trim();

  console.log("RAW session_id:", rawSessionId);
  console.log("NORMALIZED session_id:", session_id, "type:", typeof session_id);

  if (!session_id || !session_id.startsWith("cs_")) {
    throw new Error("Please provide a valid session id that starts with cs_");
  }
  if (!courseId) {
    throw new Error("Missing courseId");
  }

  const userSession = await auth();
  if (!userSession?.user?.email) redirect("/login");

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession.user.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent =
    typeof checkoutSession.payment_intent === "string"
      ? null
      : checkoutSession.payment_intent;

  const paymentStatus = paymentIntent?.status;

  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;
      console.log(productName, customerName, customerEmail,'-----------------');


  if (paymentStatus === "succeeded") {
    // await enrollForCourse(course?.id, loggedInUser?.id, "stripe");
      console.log(course?.id, loggedInUser?.id,'id--------------dff');
        const enrolled = await enrollForCourse(
          course?.id,
          loggedInUser?.id,
          "stripe"
        );

    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      },
    ];

const result = await sendEmails(emailsToSend);
console.log("EMAIL RESULT:", JSON.stringify(result, null, 2));

  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations, <strong>{customerName}</strong>! Your Enrollment
              was Successful for <strong>{productName}</strong>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
