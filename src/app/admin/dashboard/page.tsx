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

import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import SignoutButton from "@/components/signoutButton";

import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import LineGraph from "@/components/LinesalesGraph";
import LineSalesGraph from "@/components/LinesalesGraph";
import LinesLeadGraph from "@/components/LinesLeadGraph";
import { PieChartOne, PieChartTwo, PieChartThree } from '../../../components/PieChart';
Chart.register(PieController, ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        document.title = 'Dashboard';
    });


    if (status === "loading") {
        return <div>Loading...</div>;
    }
    const cards = [
        { label: 'Total Active Leads', value: '235', icon: <LightbulbIcon className="text-white" /> },
        { label: 'Total New Leads', value: '218', icon: <UserPlusIcon />, bg: 'bg-white' },
        { label: "Today's Follow-ups", value: '0', icon: <CalendarIcon />, bg: 'bg-white' },
        { label: 'Pending Follow-ups', value: '17', icon: <FileTextIcon />, bg: 'bg-white' },
        { label: 'Upcoming Follow-ups', value: '0', icon: <ClipboardIcon />, bg: 'bg-white' },
        { label: 'Total Quoted Leads', value: '30', icon: <DollarSignIcon />, bg: 'bg-white' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h2>
            <div className="flex flex-wrap -mx-2 gap-y-4">
                <div className="w-full px-2">
                    <ul className="flex flex-wrap -mx-2 gap-y-4 [&*>:first-of-type_.drl-box_.text-title]:text-white [&*>:first-of-type_.drl-box_h3]:text-white [&*>:first-of-type_.drl-box]:bg-[#7d64d0] h-full">
                        {cards.map((card, idx) => (
                            <li key={`${idx}`}
                                className="max-sm:w-full lg:w-4/12 md:w-6/12 sm:w-6/12 px-2"
                            >
                                <div className="drl-box p-4 rounded-lg border border-gray-200 bg-white">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-title font-medium text-gray-500">
                                            {card.label}
                                        </span>
                                        <div
                                            className={`w-8 h-8 rounded-md flex items-center justify-center ${card.bg === 'bg-white' ? 'bg-gray-100 text-gray-700' : 'bg-white/20'
                                                }`}
                                        >
                                            {card.icon}
                                        </div>
                                    </div>
                                    <h3
                                        className="text-2xl font-bold"
                                    >
                                        {card.value}
                                    </h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full px-2">
                    <div className="flex flex-wrap -mx-2 h-full">
                        <div className="lg:w-6/12 max-lg:w-full px-2">
                            <div className="p-4 rounded-lg border border-gray-200 bg-white h-full">
                                {/* <LineChart/> */}
                                < LineSalesGraph />
                            </div>
                        </div>
                        <div className="lg:w-6/12 max-lg:w-full px-2">
                            <div className="p-4 rounded-lg border border-gray-200 bg-white h-full">
                                {/* do second  */}
                                <LinesLeadGraph />

                            </div>
                        </div>
                    </div>
                </div>


                {/* --- Pie Charts Section --- */}
                <div className="w-full px-2">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Analytics</h3>
                    <div className="flex flex-wrap justify-between -mx-2">
                        <div className="sm:mx-w-full sm:w-1/3 px-2">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <PieChartOne />
                            </div>
                        </div>
                        <div className="sm:mx-w-full sm:w-1/3 px-2">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <PieChartTwo />
                            </div>
                        </div>
                        <div className="sm:mx-w-full sm:w-1/3 px-2">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <PieChartThree />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="w-full px-2">
                    <div className="bg-white p-0 rounded-lg border border-gray-200">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs  uppercase default-gradient text-white text-bold">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Color
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 rounded-tr-lg text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">
                                            Silver
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Microsoft Surface Pro
                                        </th>
                                        <td className="px-6 py-4">
                                            White
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop PC
                                        </td>
                                        <td className="px-6 py-4">
                                            $1999
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Magic Mouse 2
                                        </th>
                                        <td className="px-6 py-4">
                                            Black
                                        </td>
                                        <td className="px-6 py-4">
                                            Accessories
                                        </td>
                                        <td className="px-6 py-4">
                                            $99
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
               <div className="w-full px-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Sales Report</h3>
                    <div className="bg-white p-0 rounded-lg border border-gray-200">

                        <div className="relative overflow-x-auto">
                            <table className="table-evenodd-row w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs uppercase default-gradient text-white font-bold">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            New Lead
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Calls
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Meetings
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Updated
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quoted
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Deal Won
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Deal Lost
                                        </th>
                                        <th scope="col" className="px-6 py-3 rounded-tr-lg text-center">
                                            Revenue
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            28-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            27-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            26-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            25-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">1</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            24-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            23-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            22-Apr-2025
                                        </td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4 text-center">INR 0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}