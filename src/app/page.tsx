"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/admin/dashboard");
        }else{
            router.push("/login");
        }
    }, [status, router]);
    //   * Submit the data

    return (
        <div className="flex justify-center items-center h-screen">
            {/* <span className="mr-2">Welcome click to</span> <Link href="/login" className="bg-blue-50 text-2xl">Login</Link> */}
            Loading....
        </div>


    )
}