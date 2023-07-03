"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import Icon from "@/assets/Icons/icon";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import googleSignIn from "@/firebase/auth/google";
import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// interface FormData {
//   username: string;
//   email: string;
//   password: string;
// }

interface ZodFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [signup, setSignup] = useState<FormData>({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  const schema: ZodType<ZodFormData> = z
    .object({
      username: z.string().min(4).max(20),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZodFormData>({
    resolver: zodResolver(schema),
  });

  // const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSignup((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitForm = async (data: ZodFormData) => {
    const { email, password } = data;
    setLoading(true);
    const { result, error } = await signUp({ email, password });
    if (result) {
      setLoading(false);
      router.push("/");
    }
    if (error) {
      return console.log(error);
    }
    setLoading(false);
  };

  const googleSignUp = async () => {
    setLoading(true);

    const { result, error } = await googleSignIn();
    if (result) {
      console.log("Google", result);
      setLoading(false);
      router.push("/");
    }
    if (error) {
      return console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-[660px] h-auto bg-neutral px-28 pb-20 pt-12">
        <CardHeader>
          <CardTitle className="text-center font-bold text-[32px]">
            Sign Up
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="username"
                className="font-medium text-lg text-black"
              >
                Username
              </Label>
              <Input
                id="username"
                // name="username"
                type="text"
                placeholder="Enter username"
                className="rounded-3xl border-primary h-14"
                // onChange={(e) => handleFormInput(e)}
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-700">{errors.username?.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="font-medium text-lg text-black">
                Email
              </Label>
              <Input
                id="email"
                // name="email"
                type="email"
                placeholder="Enter email"
                className="rounded-3xl border-primary h-14"
                // onChange={(e) => handleFormInput(e)}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-700">{errors.email?.message}</span>
              )}
            </div>
            <>
              <div className="flex flex-col space-y-1.5 relative z-[2px]">
                <Label
                  htmlFor="password"
                  className="font-medium text-lg text-black"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  // name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="rounded-3xl border-primary h-14"
                  // onChange={(e) => handleFormInput(e)}
                  {...register("password")}
                />
                <Icon
                  name="viewPassword"
                  className="absolute right-4 bottom-3"
                  onClick={handleShowPassword}
                />
              </div>
              {errors.password && (
                <span className="text-red-700">{errors.password?.message}</span>
              )}
            </>
            <>
              <div className="flex flex-col space-y-1.5 relative">
                <Label
                  htmlFor="confirmPassword"
                  className="font-medium text-lg text-black"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="rounded-3xl border-primary h-14"
                  {...register("confirmPassword")}
                />
                <Icon
                  name="viewPassword"
                  className="absolute right-4 bottom-3"
                  onClick={handleShowPassword}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-red-700">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </>
            <Button className="w-full h-14 text-lg text-black font-semibold gap-4">
              {!loading ? (
                <input type="submit" value="Sign Up" />
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col pt-10 gap-4 border-t border-gray">
          <p className="font-normal text-xl text-blue hover:cursor-default">
            OR
          </p>
          <Button
            className="bg-transparent border border-primary w-full h-14 text-lg text-black font-semibold gap-4"
            onClick={googleSignUp}
          >
            <Icon name="google" /> Sign up with Google
          </Button>
          <Button className="bg-transparent border border-primary w-full h-14 text-lg text-black font-semibold gap-4">
            <Icon name="facebookColor" /> Sign up with Facebook
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
