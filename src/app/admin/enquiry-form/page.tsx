"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Metadata } from "next";
import { usePathname } from 'next/navigation';

export default function Enquiryform() {
    useEffect(() => {
        document.title = 'Enquiry Form';
    });
    return (

        <div className="flex justify-center items-center h-screen">
            Enquiry form here....

        </div>


    )
}