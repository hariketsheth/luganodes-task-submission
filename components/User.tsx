import {
  logout,
  verifyIfUserIsEnrolled,
  verifyUserEmail,
} from "@/firebase/authentication";
import { At, GoogleLogo, Password } from "phosphor-react";
import { getAuth, User } from "@firebase/auth";
import Link from "next/link";
import { notify } from "@/utils/notify";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";

type Props = {
  currentUser: User | null;
};

type UserData = {
  name: string;
  email: string;
  // Add other fields as needed
};

export function UserComponent({ currentUser }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // Use function expression instead of function declaration
      const fetchUserData = async () => {
        try {
          const firestore = getFirestore();
          const userRef = doc(firestore, "users", currentUser.uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            // Cast the DocumentData to UserData type
            setUserData(userSnapshot.data() as UserData);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

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
    <div className="bg-white md:w-[650px] rounded-xl p-8 justify-center items-center">
      <h2 className="mt-5 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Profile 👋
      </h2>
      <p>
        Hi <b>{userData?.name}</b>{" "}
      </p>
      <div>
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
                placeholder="Update your email"
                className={`focus:outline-none
                    block w-full rounded-xl placeholder-gray-500
                    bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
                    duration-300 invalid:ring-2 invalid:ring-red-400
                    focus:ring-2 focus:ring-black
                    ${currentUser?.emailVerified ? "verified" : "unverified"}`}
                value={currentUser?.email || ""}
                readOnly
              />
              {/* Add the chip with the dot and text */}
              <span
                className={`absolute top-1/2 transform -translate-y-1/2 right-6 py-1 px-3 rounded-full ${
                  currentUser?.emailVerified ? "bg-green" : "bg-orange"
                }`}
              >
                {/* Add the dot pseudo-element */}
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 ml-2 w-3 h-3 rounded-full 
                      ${
                        currentUser?.emailVerified ? "dot-green" : "dot-orange"
                      }`}
                ></span>
                &nbsp;&nbsp;&nbsp;
                <span
                  className={`ml-3 font-semibold ${
                    currentUser?.emailVerified ? "text-green" : "text-orange"
                  }`}
                >
                  {currentUser?.emailVerified
                    ? "Verified Email"
                    : "Unverified Email"}
                </span>
              </span>
            </div>
          </div>
          {/*  {currentUser &&
        currentUser.emailVerified &&
        !verifyIfUserIsEnrolled(currentUser) && (
          <div>
            <Link
              className="hover:text-black underline text-center w-full"
              href="/mfa"
            >
              Activate the multifactor authentication
            </Link>
           <button
            type="submit"
            className="bg-black rounded-xl flex h-11 w-full items-center justify-center px-6"
            style={{ background: "#f70b3e" }}
          >
            <span className="text-base font-light text-white">
              Update Profile
            </span>
          </button>
          </div>
        )} */}
          {currentUser &&
            !currentUser.emailVerified &&
            !verifyIfUserIsEnrolled(currentUser) && (
              <button
                onClick={sendEmail}
                className="bg-red-500 rounded-xl flex h-11 w-full items-center justify-center px-6"
              >
                <span className="relative text-base font-light text-white">
                  Verify your email
                </span>
              </button>
            )}

          <button
            onClick={logout}
            className="bg-black rounded-xl flex w-full h-11 items-center justify-center px-6"
          >
            <span className="relative text-base font-light text-white">
              Logout
            </span>
          </button>
        </form>
      </div>
      {/* )} */}
    </div>
  );
}
