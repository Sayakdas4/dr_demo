"use client";

import AppHeader from "@/app/layout/AppHeader";
import AppSidebar from "@/app/layout/AppSidebar";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  // Dynamic class for main content margin based on sidebar state


  return (

    <main>

      <div className="min-h-screen xl:flex">
        <AppSidebar />
        <div className="dashboard-main-wapper flex-1 transition-all  duration-300 ease-in-out">
          <AppHeader />
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
          </div>
        </div>
      </div>

    </main>


  );
}
