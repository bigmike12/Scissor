"use client";
import Icon from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    const { email, password } = login;
    e.preventDefault();

    setLoading(true);
    const { result, error } = await signIn({ email, password });
    if (result) {
      setLoading(false);
      router.push("/");
      setLogin({
        email: "",
        password: "",
      });
    }
    if (error) {
      // return console.log(error);
      setLoading(false);
      setLogin({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <Card className="w-[660px] h-auto bg-neutral px-28 pb-20 pt-12">
          <CardHeader>
            <CardTitle className="text-center font-bold text-[32px]">
              Login
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="font-medium text-lg text-black"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={login.email}
                  placeholder="Enter email"
                  className="rounded-3xl border-primary h-14"
                  onChange={(e) => handleFormInput(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 relative z-[2px]">
                <Label
                  htmlFor="password"
                  className="font-medium text-lg text-black"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={login.password}
                  placeholder="Enter password"
                  className="rounded-3xl border-primary h-14"
                  onChange={(e) => handleFormInput(e)}
                />
                <Icon
                  name="viewPassword"
                  className="absolute right-4 bottom-3"
                />
              </div>
              <Button
                className="w-full h-14 text-lg text-black font-semibold gap-4"
                type="submit"
              >
                {!loading ? (
                  <>Login</>
                ) : (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
