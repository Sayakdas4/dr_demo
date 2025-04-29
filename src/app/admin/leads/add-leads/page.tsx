"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
    LightbulbIcon,
    UserPlusIcon,
    CalendarIcon,
    FileTextIcon,
    ClipboardIcon,
    DollarSignIcon,
} from 'lucide-react';




export default function Addleds() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        document.title = 'Add Leads';
    });


    if (status === "loading") {
        return <div>Loading...</div>;
    }
    

    return (
        <div className="bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h2>
            <div className="flex flex-wrap -mx-2 gap-y-4">
                <div className="w-full px-2">
                    ddd
                </div>
                <div className="w-full px-2">
                    sdsdsdsd
                </div>


            </div>

        </div>
    );

}