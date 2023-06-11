"use client";
import React, { useEffect, useState } from "react";
import SignInButton from "./SignInButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Navbar() {
  const { data: session } = useSession();
  const [state, setState] = useState(false);

  useEffect(() => {
    if (session?.user?.accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${session.user.accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [session]);

  const navigation = [
    { title: "Notifications", path: "/" },
    { title: "Photos", path: `/photos?user_id=${session?.user.id}&token=${session?.user?.accessToken}` },
    { title: "Text", path: `/text?user_id=${session?.user.id}&token=${session?.user?.accessToken}` },
    { title: "Calculator", path: "/calculator" },
  ];

  return (
    <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:py-3 md:block">
          <Link href="/">
            <img
              src="https://nordstone.co.uk/wp-content/uploads/2023/01/Black-logo-e1674744659951.png"
              className="h-6 mr-3 sm:h-9"
              alt="Float UI logo"
            />
          </Link>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-800" onClick={() => setState(!state)}>
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 pb-2 mt-4 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}>
          <ul className="justify-end items-center space-y-4 md:flex md:space-x-4 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-indigo-600">
                  <Link href={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <span className="hidden w-px h-5 bg-gray-300 md:block"></span>
            <div className="space-y-2 items-center gap-x-4 md:flex md:space-y-0">
              <li>
                <Link
                  href="/auth/register"
                  className="block py-2 px-3 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <SignInButton />
              </li>
              {/* <SessionButton /> */}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
