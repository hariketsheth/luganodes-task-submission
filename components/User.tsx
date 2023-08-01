import {
  logout,
  verifyIfUserIsEnrolled,
  verifyUserEmail,
} from "@/firebase/authentication";
import { At, GoogleLogo, Password } from "phosphor-react";
import { User } from "@firebase/auth";
import Link from "next/link";
import { notify } from "@/utils/notify";

type Props = {
  currentUser: User | null;
};

export function UserComponent({ currentUser }: Props) {
  async function sendEmail() {
    if (currentUser) {
      const response = await verifyUserEmail(currentUser);

      if (response) {
        notify("An Email has been sent to you");
      } else {
        notify("Something went wrong");
      }
    }
  }

  return (
    <div className="bg-white md:w-[500px] rounded-xl p-8 justify-center items-center">
      <h2 className="mt-5 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Profile 👋
      </h2>
      {currentUser &&
        currentUser.emailVerified &&
        !verifyIfUserIsEnrolled(currentUser) && (
          <div>
            <Link
              className="hover:text-black underline text-center w-full"
              href="/mfa"
            >
              Activate the multifactor authentication
            </Link>
            <form className="space-y-8">
              <div className="space-y-4">
                <div className="relative flex items-center">
                  <At
                    style={{ color: "#f70b3e" }}
                    className="w-6 h-6 absolute left-4 inset-y-0 my-auto"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Insert your email"
                    className="focus:outline-none
                                                       block w-full rounded-xl placeholder-gray-500
                                                       bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
                                                       duration-300 invalid:ring-2 invalid:ring-red-400
                                                       focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div className="space-y-4 my-6">
                <div className="relative flex items-center">
                  <Password
                    style={{ color: "#f70b3e" }}
                    className="w-6 h-6 absolute left-4 inset-y-0 my-auto"
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Insert your password"
                    className="focus:outline-none block w-full rounded-xl placeholder-gray-500 bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-black rounded-xl flex h-11 w-full items-center justify-center px-6"
                style={{ background: "#f70b3e" }}
              >
                <span className="text-base font-light text-white">
                  Update Profile
                </span>
              </button>

              <button
                onClick={logout}
                className="bg-black rounded-xl flex h-11 w-full items-center justify-center px-6"
              >
                <span className="relative text-base font-light text-white">
                  Logout
                </span>
              </button>
            </form>
          </div>
        )}
      {currentUser &&
        !currentUser.emailVerified &&
        !verifyIfUserIsEnrolled(currentUser) && (
          <div>
            <p> {currentUser.email}</p> <br></br>
            <button
              onClick={sendEmail}
              className="bg-red-500 rounded-xl flex h-11 w-full items-center justify-center px-6"
            >
              <span className="relative text-base font-light text-white">
                Verify your email
              </span>
            </button>
            <br></br>
            <button
              onClick={logout}
              className="bg-black rounded-xl flex w-full h-11 items-center justify-center px-6"
            >
              <span className="relative text-base font-light text-white">
                Disconnect
              </span>
            </button>
          </div>
        )}
    </div>
  );
}
