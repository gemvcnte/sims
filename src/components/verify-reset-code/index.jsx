import React, { useEffect, useState } from "react";
import logo from "../../assets/sims-logo-img.svg";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordGenerateEndpoint } from "@/config/publicEndpoints";
import showErrorNotification from "@/utils/ShowErrorNotification";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

export default function VerifyResetCode() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "var(--clr-white-400)";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [loading, setLoading] = useState(false);

  const handleContinueWithToast = (e) => {
    e.preventDefault();

    navigate("/reset-password");

    toast("Success! Check your email", {
      description: "We've sent a reset code to your email address.",
    });
  };

  const verifyResetCode = (username) => {
    setLoading(true);

    try {
      if (!username) {
        return;
      }

      const response = axios.post(resetPasswordGenerateEndpoint, { username });

      if (response.status === 200) {
        handleContinueWithToast();
      }

      setLoading(false);
    } catch (error) {
      showErrorNotification("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex h-[100svh]  items-center justify-center overflow-hidden px-8">
        <form onSubmit={verifyResetCode}>
          <section className="mx-auto mt-8 flex max-w-[56ch] flex-col gap-6 rounded-lg p-4 text-center">
            <div className="flex flex-col items-center gap-4 pt-8 ">
              <img src={logo} alt="" className="max-w-[2rem]" />
              <h1 className="text-2xl font-semibold leading-none tracking-tight">
                Verify Reset Code
              </h1>
              <h2 className=" leading-7 text-muted-foreground">
                Please enter the 6-digit code we <br className="sm:hidden" />{" "}
                sent to your email.
              </h2>
            </div>
            <div className="flex items-center justify-center py-2">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="p-6" />
                  <InputOTPSlot index={1} className="p-6" />
                  <InputOTPSlot index={2} className="p-6" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="p-6" />
                  <InputOTPSlot index={4} className="p-6" />
                  <InputOTPSlot index={5} className="p-6" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              variant="primary"
              className="mx-auto flex w-full max-w-[48ch] items-center justify-center gap-2 rounded-md bg-primary px-24 py-6 text-background transition-all duration-300 hover:gap-8"
              type="submit"
              disabled={code.length !== 6}
            >
              Reset Password
              <Icon
                icon="ph:arrow-up-thin"
                width="20"
                color="white"
                rotate={1}
              />
            </Button>
          </section>
        </form>
      </main>
    </>
  );
}
