import Menu from "./account-menu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
// import Image from "next/image";

const AccountSidebar = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const loggedInUser = await getUserByEmail(session.user.email);

  const avatar =
    loggedInUser?.profilePicture?.trim()
      ? loggedInUser.profilePicture
      : "/images/default-avatar.png";

  const fullName = `${loggedInUser?.firstName ?? ""} ${loggedInUser?.lastName ?? ""}`.trim();

  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="relative">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <div className="profile-pic text-center mb-5">
 {/* <Image
        // src={preview}
        className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
        // alt={altText}
        width={112}
        height={112}
      /> */}
            <div className="mt-4">
              <h5 className="text-lg font-semibold">{fullName || "User"}</h5>
              <p className="text-slate-400">{loggedInUser?.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
