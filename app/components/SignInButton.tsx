"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

type Props = {};

export default function SignInButton({}: Props) {
  // NOTE: Here session is not a type but we are just renaming data to session
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Link
        href="javascript:void(0)"
        onClick={() => {
          signOut();
        }}
        className="block py-2 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
      >
        Sign Out
      </Link>
    );
  }
  return (
    <Link
      href="javascript:void(0)"
      onClick={() => {
        signIn();
      }}
      className="block py-2 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
    >
      Log In
    </Link>
  );
}
