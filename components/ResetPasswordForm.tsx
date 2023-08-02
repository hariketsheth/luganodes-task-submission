import { FormEvent, useRef } from "react";
import { At, GoogleLogo, Password } from "phosphor-react";
import { notify, notifySuccess } from "@/utils/notify";
import { useRouter } from "next/router";

type ResetPasswordProps = {
  resetPassword: (email: string) => Promise<boolean> | void;
};

export function ResetPasswordForm({ resetPassword }: ResetPasswordProps) {
  const email = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email.current) {
      const resetSuccess = await resetPassword(email.current.value);
      if (resetSuccess) {
        notifySuccess("Reset Password Link was sent Successfully !");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        notifySuccess("Reset Password Link was sent Successfully !");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleResetPassword}>
      <div className="space-y-4">
        <div className="relative flex items-center">
          <At
            style={{ color: "#f70b3e" }}
            className="w-6 h-6 absolute left-4 inset-y-0 my-auto"
          />
          <input
            type="email"
            name="email"
            ref={email}
            placeholder="Insert your email"
            className="focus:outline-none
                      block w-full rounded-xl placeholder-gray-500
                      bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition
                      duration-300 invalid:ring-2 invalid:ring-red-400
                      focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-black rounded-xl flex h-11 w-full items-center justify-center px-6"
        style={{ background: "#f70b3e" }}
      >
        <span className="text-base font-light text-white">Reset Password</span>
      </button>
    </form>
  );
}
