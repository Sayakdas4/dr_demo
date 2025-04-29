"use client";

import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Contactform() {
    useEffect(() => {
        document.title = 'Contact Form';
    });
    return (

        <div className="flex justify-center items-center h-screen">
            Contact form here....

        </div>


    )
}