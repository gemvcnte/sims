import React, { useEffect, useState } from "react";
import logo from "../../assets/sims-logo-img.svg";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordGenerateEndpoint } from "@/config/publicEndpoints";
import showErrorNotification from "@/utils/ShowErrorNotification";

export default function VerifyResetCode() {
  const [username, setUsername] = useState("");
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

  const generateResetCode = (username) => {
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
        <form>
          <section className="mx-auto mt-8 flex max-w-[45ch] flex-col gap-4 rounded-lg p-4 text-center">
            <div className="flex flex-col items-center gap-2 pt-8 ">
              <img src={logo} alt="" className="max-w-[3rem]" />
            </div>
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              Forgot Password?
            </h1>
            <h2 className="leading-7 text-muted-foreground">
              No worries, We'll send you a reset code.
            </h2>
            <div className="flex items-center justify-between gap-4">
              <span className="w-[10%]">
                {!username ? (
                  <Icon
                    icon="teenyicons:user-outline"
                    width="20"
                    className="text-primary"
                  />
                ) : (
                  <Icon
                    icon="teenyicons:user-solid"
                    width="20"
                    className="text-primary"
                  />
                )}
              </span>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="border-white-700 placeholder-white-700 w-full rounded-md border-b p-3 focus:border focus:border-primary focus:outline-none"
              />
            </div>

            <button
              className=" flex items-center justify-center gap-2 rounded-md bg-primary px-10 py-3 text-white transition-all duration-300 hover:gap-8"
              type="submit"
            >
              Continue
              <Icon
                icon="ph:arrow-up-thin"
                width="20"
                color="white"
                rotate={1}
              />
            </button>

            <Button
              variant="link"
              className="mt-4 text-muted-foreground"
              onClick={() => navigate("/")}
            >
              Back to login
            </Button>

            <Button variant="outline" onClick={handleContinueWithToast}>
              Show Toast
            </Button>
          </section>
        </form>
      </main>
    </>
  );
}
