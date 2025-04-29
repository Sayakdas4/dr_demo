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




export default function Viewleds() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    const [isModalOpen, setIsModelOpen] = useState(false);

    const [isForm, setIsForm] = useState(1);

    const handleClickNext = (newValue: number) => {
        setIsForm(newValue);
    };

    //const toggleModal = () => setIsModelOpen(!isModalOpen);

    const toggleModal = () => {
        setIsModelOpen(!isModalOpen);
        setIsForm(1);
    };

    useEffect(() => {
        document.title = 'View Leads';
    });


    if (status === "loading") {
        return <div>Loading...</div>;
    }


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex gap-3 mb-4 items-center">
                <h2 className="text-xl font-semibold mb-0 text-gray-800 inline-block mr-[15px]">View Leads</h2>
                <div className="">
                    <ul className="filter_ul flex flex-wrap align-items-center gap-2">
                        {/* <li>
                            <div className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <img width="20" className="icon-color--" src="/images/icons/funnel.svg" />
                                Filters
                            </div>
                        </li> */}
                        <li>
                            <div onClick={toggleModal} className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <img width="20" className="icon-color--" src="/images/icons/add-user.svg" />
                                Add Leads
                            </div>
                        </li>
                        {/* <li>
                            <div className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <img width="20" className="icon-color--" src="/images/icons/bulk-uploads.svg" />
                                Bulk Uploads
                            </div>
                        </li>
                        <li>
                            <div className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <img width="20" className="icon-color--" src="/images/icons/events.svg" />
                                My Events
                            </div>
                        </li> */}
                    </ul>
                </div>
                {/* <div className="ml-auto d-flex flex-wrap align-items-center gap-3">
                    <ul className="filter_ul flex flex-wrap align-items-center gap-2">
                        <li>
                            <div className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <label className="mb-0 text-xs text-xxl-sm font-medium text-light">
                                    Show Result
                                </label>
                                <select
                                    className="py-0 border-0 text-light text-sm outline-none focus:outline-none focus:border-none focus:shadow-none"
                                >
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={40}>40</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </li>

                        <li>
                            <div className="inline-flex gap-1 items-center justify-center px-3 py-1 text-[12px]  transition rounded-full cursor-pointer bg-white border border-gray-200 text-black hover:opacity-90">
                                <label className="mb-0 text-xs text-xxl-sm font-medium text-light">
                                    Sort By
                                </label>
                                <select
                                    className="py-0 border-0 text-light text-sm outline-none focus:outline-none focus:border-none focus:shadow-none"
                                >
                                    <option value="">Select One</option>
                                    <optgroup label="ID">
                                        <option value="lead.id-asc">ASC</option>
                                        <option value="lead.id-desc">DESC</option>
                                    </optgroup>
                                    <optgroup label="Enquiry Date">
                                        <option value="lead.enquiry_date-asc">ASC</option>
                                        <option value="lead.enquiry_date-desc">DESC</option>
                                    </optgroup>
                                    <optgroup label="Title">
                                        <option value="lead.title-asc">A to Z</option>
                                        <option value="lead.title-desc">Z to A</option>
                                    </optgroup>
                                    <optgroup label="Last Updated">
                                        <option value="lead.modify_date-asc">ASC</option>
                                        <option value="lead.modify_date-desc">DESC</option>
                                    </optgroup>
                                    <optgroup label="Next Follow-up Date">
                                        <option value="lead.followup_date-asc">ASC</option>
                                        <option value="lead.followup_date-desc">DESC</option>
                                    </optgroup>
                                </select>
                            </div>
                        </li>

                    </ul>
                </div> */}
            </div>

            <div className="flex flex-wrap -mx-2 gap-y-4">
                <div className="w-full px-2">
                    <div id="tcontent" className="w-full">
                        <ul className="grid-view-ul">
                            <li className="w-full mb-6">
                                <div className="w-full border rounded-lg shadow-md p-0 bg-white relative">
                                    <div className="flex w-full align-middle px-4 pt-3 items-center gap-2 mb-3 justify-between border-b pb-2 bg-gray-100">
                                        <div className="w-auto">
                                            <ul className="flex align-middle items-center gap-0">
                                                <li className="border-r pr-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full block text-[12px] font-bold">Lead ID</label>
                                                        <input type="text" className="border-0 p-0 w-[50px] text-[12px] bg-transparent" value="336" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full block text-[12px] font-bold">Lead Date</label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="18-Apr-2025" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Closure Date
                                                            {/* <a className="cursor-pointer" title="Edit">
                                                                <img src="/images/icons/pencil.svg" className="w-[16px] h-auto" />
                                                            </a> */}
                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="18-Apr-2025" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Deal Value
                                                            {/* <a className="cursor-pointer" title="Edit">
                                                                <img src="/images/icons/pencil.svg" className="w-[16px] h-auto" />
                                                            </a> */}
                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="N/A" />
                                                    </div>
                                                </li>
                                                <li className=" pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Quotation

                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="N/A" />
                                                    </div>
                                                </li>


                                            </ul>
                                        </div>

                                        {/* <div className="w-auto">
                                            <ul className="flex align-middle items-center gap-3">

                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef] " data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/telephone-arrow-top-right.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/whatsapp-icon.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/envelope-2.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/hand-shake.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>


                                            </ul>
                                        </div> */}

                                    </div>


                                    <div className="flex w-full columns-2 gap-2 mb-5 px-4 mt-7 items-center">
                                        <div className="w-full">
                                            <div className="flex items-top justify-between w-full max-w-3xl">
                                                {/* Step 1 */}
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold">&#10003;</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">PENDING</span>
                                                </div>
                                                {/* Line */}
                                                <div className="flex-1 h-1 bg-[#7dbf94] mx-2 mt-[5px]" />
                                                {/* Step 2 */}
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold">&#10003;</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">NOT PICKED</span>
                                                </div>
                                                {/* Line */}
                                                <div className="flex-1 h-1 bg-[#7dbf94] mx-2 mt-[5px]" />
                                                {/* Step 3 */}
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold mt-[-4px]">...</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">SEEDING</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex w-full columns-2 gap-2 mb-5 items-center px-4">
                                        <div className="w-full">
                                            <ul className="flex align-middle items-center gap-2">

                                                {/* <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        <img
                                                            src="/images/icons/replay.svg"
                                                            width={16}
                                                        />
                                                        Email Reply
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        <img
                                                            src="/images/icons/bot.svg"
                                                            width={16}
                                                        />
                                                        AI Lead Analyszer
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        Call Attemps
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        Meeting Attemps
                                                    </div>
                                                </li> */}

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-2 text-[12px]  transition rounded-full cursor-pointer  bg-[#F0524B] text-white bg-brand-500 custom-shadow border border-white hover:bg-brand-600">
                                                        <img src="/images/icons/file-dollar.svg" width="20" className="icon-white-color" />
                                                        Reply Quotation
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-2 text-[12px]  transition rounded-full cursor-pointer bg-[#F0524B] text-white bg-brand-500 custom-shadow border border-white hover:bg-brand-600">
                                                        <img src="/images/icons/server-pencil.svg" width="20" className="icon-white-color" />
                                                        Update
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                    <div className="block w-full mb-0 items-center border-t py-3 px-4">
                                        <div className="block w-full mb-3">
                                            <div className="flex w-full mb-1 items-center gap-2">
                                                <span className="font-bold">Company</span>
                                                {/* <span className="cursor-pointer">
                                                    <img src="/images/icons/pencil.svg" className="w-4 h-auto" />
                                                </span> */}
                                            </div>
                                            <div className="flex w-full mb-0 text-sm font-bold text-blue-400">Demo</div>
                                            <div className="flex w-full mb-0 text-sm text-black">LMSbaba</div>

                                            <div className="flex w-full gap-4 items-center">
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Mobile:</span> +91-9000000001</div>
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Email:</span> info.porel123@lmsbaba.com</div>
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Location:</span> Noida, Uttar Pradesh, India</div>
                                            </div>

                                        </div>
                                        {/* <div className="flex w-full columns-2 gap-2 mb-0 items-center justify-between">
                                            <div className="w-auto">
                                                <ul className="flex align-middle items-center gap-2">

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/scan-eye.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/file-upload.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/add-users.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/building-user.svg" width="24" />
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                            </li>

                            {/* <li className="w-full mb-1">
                                <div className="w-full border rounded-lg shadow-md p-0 bg-white relative">
                                    <div className="flex w-full align-middle px-4 pt-3 items-center gap-2 mb-3 justify-between border-b pb-2 bg-gray-100">
                                        <div className="w-auto">
                                            <ul className="flex align-middle items-center gap-0">
                                                <li className="border-r pr-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full block text-[12px] font-bold">Lead ID</label>
                                                        <input type="text" className="border-0 p-0 w-[50px] text-[12px] bg-transparent" value="336" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full block text-[12px] font-bold">Lead Date</label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="18-Apr-2025" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Closure Date
                                                            <a className="cursor-pointer" title="Edit">
                                                                <img src="/images/icons/pencil.svg" className="w-[16px] h-auto" />
                                                            </a>
                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="18-Apr-2025" />
                                                    </div>
                                                </li>
                                                <li className="border-r pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Deal Value
                                                            <a className="cursor-pointer" title="Edit">
                                                                <img src="/images/icons/pencil.svg" className="w-[16px] h-auto" />
                                                            </a>
                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="N/A" />
                                                    </div>
                                                </li>
                                                <li className=" pr-3 pl-3">
                                                    <div className="auto-row text-sm block">
                                                        <label className="mb-0 w-full flex gap-1 text-[12px] font-bold">
                                                            Quotation

                                                        </label>
                                                        <input type="text" className="border-0 p-0 w-[70px] text-[12px] bg-transparent" value="N/A" />
                                                    </div>
                                                </li>


                                            </ul>
                                        </div>

                                        <div className="w-auto">
                                            <ul className="flex align-middle items-center gap-3">

                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef] " data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/telephone-arrow-top-right.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/whatsapp-icon.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/envelope-2.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="block cursor-pointer px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-[#62c2ef]" data-leadid="336" data-mobile="9000000001" data-contactperson="Demo">
                                                        <img src="/images/icons/hand-shake.svg" alt="Call" width="28" height="28" className="icon-color" />
                                                    </a>
                                                </li>


                                            </ul>
                                        </div>

                                    </div>


                                    <div className="flex w-full columns-2 gap-2 mb-5 px-4 mt-7 items-center">
                                        <div className="w-full">
                                            <div className="flex items-top justify-between w-full max-w-3xl">
                                               
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold">&#10003;</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">PENDING</span>
                                                </div>
                                             
                                                <div className="flex-1 h-1 bg-[#7dbf94] mx-2 mt-[5px]" />
                                               
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold">&#10003;</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">NOT PICKED</span>
                                                </div>
                                            
                                                <div className="flex-1 h-1 bg-[#7dbf94] mx-2 mt-[5px]" />
                                             
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#7dbf94] text-white">
                                                        <span className="text-white font-bold mt-[-4px]">...</span>
                                                    </div>
                                                    <span className="text-gray-700 text-[10px] mt-2">SEEDING</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex w-full columns-2 gap-2 mb-5 items-center px-4">
                                        <div className="w-full">
                                            <ul className="flex align-middle items-center gap-2">

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        <img
                                                            src="/images/icons/replay.svg"
                                                            width={16}
                                                        />
                                                        Email Reply
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        <img
                                                            src="/images/icons/bot.svg"
                                                            width={16}
                                                        />
                                                        AI Lead Analyszer
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        Call Attemps
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-1 text-[12px]  transition rounded-full bg-white border border-gray-300 cursor-pointer">
                                                        Meeting Attemps
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-2 text-[12px]  transition rounded-full cursor-pointer bg-[#F0524B] text-white hover:opacity-90">
                                                        <img src="/images/icons/file-dollar.svg" width="20" className="icon-white-color" />
                                                        Send Quotation
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inline-flex gap-1 items-center justify-center px-4 py-2 text-[12px]  transition rounded-full cursor-pointer bg-[#F0524B] text-white hover:opacity-90">
                                                        <img src="/images/icons/server-pencil.svg" width="20" className="icon-white-color" />
                                                        Update
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>

                                    <div className="block w-full mb-0 items-center border-t py-3 px-4">
                                        <div className="block w-full mb-3">
                                            <div className="flex w-full mb-1 items-center gap-2">
                                                <span className="font-bold">From</span>
                                                <span className="cursor-pointer">
                                                    <img src="/images/icons/pencil.svg" className="w-4 h-auto" />
                                                </span>
                                            </div>
                                            <div className="flex w-full mb-0 text-sm font-bold text-blue-400">Demo</div>
                                            <div className="flex w-full mb-0 text-sm text-black">LMSbaba</div>

                                            <div className="flex w-full gap-4 items-center">
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Mobile:</span> +91-9000000001</div>
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Email:</span> info.porel123@lmsbaba.com</div>
                                                <div className="inline-block mb-0 text-sm text-black"><span className="font-bold">Location:</span> Noida, Uttar Pradesh, India</div>
                                            </div>

                                        </div>
                                        <div className="flex w-full columns-2 gap-2 mb-0 items-center justify-between">
                                            <div className="w-auto">
                                                <ul className="flex align-middle items-center gap-2">

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/scan-eye.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/file-upload.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/add-users.svg" width="24" />
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="inline-flex gap-1 items-center justify-center px-1 py-1 text-[12px]  transition rounded-[6px] bg-white border border-gray-300 cursor-pointer">
                                                            <img src="/images/icons/building-user.svg" width="24" />
                                                        </div>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li> */}
                        </ul>
                    </div>

                </div>
                {/* <div className="w-full px-2">
                    sdsdsdsd
                </div> */}


            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full px-6 py-4 relative overflow-hidden">
                        <h2 className="text-lg font-semibold mb-4 border-b">Add New Lead</h2>
                        <div className="w-full overflow-y-auto max-h-[80vh]">

                            <div className={`form-holder form-1 ${isForm === 1 ? 'show' : 'hidden'}`}>
                                <div className="form-group show custom-add-lead-select2 mb-2">
                                    <label htmlFor="select1" className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                        Select an Account<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="cla_customer_id"
                                        name="customer_id"
                                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                        data-is_enable="Y"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    >
                                        <option value="">
                                            Select
                                        </option>
                                    </select>

                                </div>
                                <div className="form-group show custom-add-lead-select2 mb-2">
                                    <label htmlFor="select1" className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                        Select a Product<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="cla_product_id"
                                        name="product_id"
                                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"

                                        data-is_enable="Y"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    >
                                        <option value="">
                                            Selec
                                        </option>
                                    </select>

                                </div>
                                <div className="form-group show mb-2">
                                    <label htmlFor="select1" className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                        Select a Region<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="cla_region_id"
                                        name="region_id"
                                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"

                                        data-is_enable="Y"

                                    >
                                        <option value="">
                                            Select
                                        </option>
                                        <option value={3}>EURope</option>
                                        <option value={1}>North India</option>
                                        <option value={4}>Shashi</option>
                                        <option value={2}>South India</option>
                                    </select>
                                </div>

                                <div className="form-group show mb-2">
                                    <label htmlFor="select1" className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                        Select Stage
                                    </label>
                                    <select
                                        id="cla_stage_id"
                                        name="stage_id"
                                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"

                                        data-is_enable="Y"
                                    >
                                        <option value="">
                                            Select
                                        </option>
                                        <option value={12}>NOT PICKED</option>
                                        <option value={8}>PROSPECT</option>
                                        <option value={10}>CONTACTED</option>
                                        <option value={13}>SEEDING</option>
                                        <option value={11}>LOCK-INS</option>
                                        <option value={2}>QUOTED</option>
                                        <option value={9}>NEGOTIATION</option>
                                    </select>
                                </div>

                                <div className="file mt-4">
                                    <input
                                        type="button"
                                        defaultValue=""
                                        className=""
                                        id="custom_lead_add_submit_confirm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleClickNext(2)}
                                        className="inline-flex gap-1 items-center justify-center px-4 py-3 text-sm font-medium text-white transition rounded-4xl bg-brand-500 custom-shadow border border-white hover:bg-brand-600 cursor-pointer"
                                    >
                                        <img src="/images/icons/save.svg" /> Save
                                        &amp; Continue
                                    </button>
                                </div>
                            </div>

                            <div className={`form-holder form-1 ${isForm === 2 ? 'show' : 'hidden'}`}>
                                <div className="middle_form">
                                    <form
                                        id="frmLeadAdd"
                                        name="frmLeadAdd"
                                        method="post"
                                        action=""
                                        className="new-lead-sec-from rounded-form"
                                    >
                                        <div className="mb-4 px-3 py-2 rounded-lg border border-theme-200 bg-theme-50 text-sm">
                                            <ul className="buyer_email_subject buyer_email_subject_border mb-0">
                                                <li>
                                                    <b>Company:</b> <span className="display">777</span>
                                                </li>
                                                <li>
                                                    <b>Product:</b> <span className="display">APPLE_HEADPHONES</span>
                                                </li>
                                                <li>
                                                    <b>Region:</b>{" "}
                                                    <span className="display">
                                                        India &gt;&gt; Uttar Pradesh &gt;&gt; Gawan{" "}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Contact List Dropdown Start */}
                                        <div className="dropdown bulk_dd text-right">
                                            <a
                                                href="JavaScript:void(0)"
                                                className="new_filter_btn  dropdown-toggle text-sm"
                                                type="button"
                                                data-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Select Contact From Address Book
                                            </a>
                                            <ul className="dropdown-menu dropdown_contact_scroll rounded-xl border-gray-200">
                                                <li>
                                                    <a
                                                        href="JavaScript:void(0);"
                                                        className="lead_contact_change"
                                                        data-id={0}
                                                        data-cid={124}
                                                    >
                                                        <div className="text-sm">
                                                            <b className="font-medium">Name:</b>&nbsp;777
                                                            <br />
                                                            <b className="font-medium">Email:</b>&nbsp;777@gmail.com
                                                            <br />
                                                        </div>
                                                    </a>
                                                </li>
                                                <li role="separator" className="divider" />
                                                <li>
                                                    <a
                                                        href="JavaScript:void(0);"
                                                        id="reset_lead_contact_change"
                                                        className="text-sm font-medium d-inline-flex align-items-center gap-1"
                                                    >
                                                        <svg
                                                            width={20}
                                                            height={20}
                                                            viewBox="0 0 25 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            transform="rotate(0 0 0)"
                                                        >
                                                            <path
                                                                d="M3.13512 14.4582C3.02791 14.0581 3.26535 13.6469 3.66545 13.5397C4.06555 13.4325 4.4768 13.6699 4.58401 14.07C5.03977 15.771 6.04406 17.274 7.44111 18.346C8.83816 19.418 10.5499 19.999 12.3108 19.999C14.0718 19.999 15.7835 19.418 17.1806 18.346C18.5652 17.2835 19.564 15.7976 20.0254 14.1153C20.0888 13.7653 20.3951 13.4998 20.7634 13.4998C21.1776 13.4998 21.5134 13.8356 21.5134 14.2498V18.7498C21.5134 19.164 21.1776 19.4998 20.7634 19.4998C20.3491 19.4998 20.0134 19.164 20.0134 18.7498V17.5593C19.4765 18.3031 18.8312 18.9701 18.0937 19.536C16.4347 20.809 14.402 21.499 12.3108 21.499C10.2197 21.499 8.18698 20.809 6.52796 19.536C4.86895 18.263 3.67634 16.4781 3.13512 14.4582Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M4.61102 5.24978V6.43967C5.14776 5.69626 5.7928 5.02961 6.52992 4.464C8.18893 3.19099 10.2216 2.50098 12.3128 2.50098C14.4039 2.50098 16.4366 3.19099 18.0957 4.464C19.7547 5.737 20.9473 7.52186 21.4885 9.54175C21.5957 9.94185 21.3583 10.3531 20.9582 10.4603C20.5581 10.5675 20.1468 10.3301 20.0396 9.92998C19.5839 8.22904 18.5796 6.72602 17.1825 5.65403C15.7855 4.58203 14.0737 4.00098 12.3128 4.00098C10.5518 4.00098 8.84011 4.58204 7.44306 5.65403C6.06033 6.71503 5.06236 8.19827 4.60015 9.87773C4.53943 10.231 4.23161 10.4998 3.86102 10.4998C3.44681 10.4998 3.11102 10.164 3.11102 9.74978V5.24978C3.11102 4.83557 3.44681 4.49978 3.86102 4.49978C4.27523 4.49978 4.61102 4.83557 4.61102 5.24978Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        Reset &amp; Create as New Contact
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Contact List Dropdown End */}
                                        <div style={{ clear: "both" }}>&nbsp;</div>
                                        <div style={{ clear: "both" }} />
                                        <div className="padding_35 full-l">
                                            <div className="flex gap-x-4 mb-3">
                                                <div className="w-full">
                                                    <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                        Lead Title<span className="text-red-500">*</span>:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                                                        name="lead_title"
                                                        id="lead_title"
                                                        placeholder="Email"
                                                        defaultValue="777 _ APPLE_HEADPHONES _ India >> Uttar Pradesh >> Gawan"
                                                    />
                                                </div>

                                            </div>

                                            <div className="show">
                                                <div className="flex gap-x-4 mb-3">
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">Email ID:</label>
                                                        <input
                                                            type="text"
                                                            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                                                            name="com_email"
                                                            id="com_email"
                                                            placeholder="Email"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">Mobile:</label>
                                                        <input
                                                            type="text"
                                                            className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                            name="com_mobile"
                                                            id="com_mobile"
                                                            placeholder="Mobile"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-x-4 mb-3">
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Contact Person<span className="text-red-500">*</span>:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                            name="com_contact_person"
                                                            id="com_contact_person"
                                                            placeholder="Contact Person"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Designation<span className="text-red-500">*</span>:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                            name="com_designation"
                                                            id="com_designation"
                                                            placeholder="Designation"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-x-4 mb-3">
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Select Country<span className="text-red-500">*</span>:
                                                        </label>
                                                        <select
                                                            className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                            name="com_country_id"
                                                            id="com_country_id"

                                                        >
                                                            <option value="">Select</option>
                                                            <option value={1}>Afghanistan</option>
                                                            <option value={2}>Albania</option>
                                                        </select>

                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Assign To<span className="text-red-500">*</span>:
                                                        </label>
                                                        <select
                                                            className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                            name="assigned_user_id"
                                                            id="assigned_user_id"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value={1}>
                                                                Shashi Narain (Emp. ID: 1)
                                                            </option>
                                                            <option value={2}>Sumit Mehrotra (Emp. ID: 2)</option>
                                                            <option value={3}>Bhawna (Emp. ID: 3)</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="flex gap-x-4 mb-3">
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Enquiry Received Date<span className="text-red-500">*</span>:
                                                        </label>
                                                        <div className="rela-div">
                                                            <span className="label-set">Select a date</span>
                                                            <input
                                                                type="text"
                                                                className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                                name="lead_enq_date"
                                                                id="lead_enq_date"
                                                                placeholder="Enquiry date"
                                                                defaultValue="26-Apr-2025"

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                            Next Follow Up Date<span className="text-red-500">*</span>:
                                                        </label>
                                                        <div className="rela-div">
                                                            <span className="label-set">Select a date</span>
                                                            <input
                                                                type="text"
                                                                className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                                name="lead_follow_up_date"
                                                                id="lead_follow_up_date"
                                                                placeholder="Follow up date"
                                                                defaultValue="26-Apr-2025"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-x-4 mb-3">
                                                <div className="w-full">
                                                    <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">Describe Requirements:</label>

                                                    <textarea
                                                        rows={1}
                                                        cols={1}
                                                        className="form-control basic-wysiwyg-editor border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-[110px] text-sm"
                                                        name="lead_requirement"
                                                        id="lead_requirement"
                                                        placeholder="Describe Requirements"

                                                        aria-hidden="true"
                                                        defaultValue={" "}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-x-4 mb-3">
                                                <div className="w-1/2">
                                                    <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">
                                                        Lead Source<span className="text-red-500">*</span>:
                                                    </label>
                                                    <select
                                                        className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                        name="com_source_id"
                                                        id="com_source_id"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value={11}>Ali Baba</option>
                                                        <option value={76}>Anime fest kolkata 2025</option>
                                                        <option value={70}>Auto Ticket</option>
                                                    </select>
                                                </div>
                                                <div className="w-1/2">
                                                    <label className="full-label w-full block font-bold text-gray-800 text-sm mb-1">Attach File (if any):</label>
                                                    <input type="file" name="lead_attach_file" id="lead_attach_file" className="border text-sm border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-3 pb-4 border-t file in-p w-full flex items-center justify-center gap-2">


                                            {/* <label
                                                    htmlFor="file"
                                                    className="serach-btn btn-theme-500 d-inline-flex align-items-center gap-1"
                                                >
                                                    Add Lead
                                                </label> */}

                                            <button
                                                type="button"
                                                onClick={() => handleClickNext(3)}
                                                className="inline-flex gap-1 items-center justify-center px-4 py-3 text-sm font-medium text-white transition rounded-4xl bg-brand-500 custom-shadow border border-white hover:bg-brand-600 cursor-pointer w-[160px]"
                                            >
                                                Add Lead
                                            </button>

                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>

                        <button
                            onClick={toggleModal}
                            className="absolute top-2 right-6 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>


    );

}