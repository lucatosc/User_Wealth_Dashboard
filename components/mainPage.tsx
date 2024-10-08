"use client";
import { AccordionTemp } from "@/components/Accordion";
import  Chart  from "react-apexcharts";
import { Button } from "flowbite-react";
import { accordionData, listData } from "@/components/example";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { ModalTemp } from "./Modal";

export function MainPage() {
    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState("");

    const addNewAsset = () => {
        setState("Add New Asset");
        setOpenModal(true);
    }

    // useEffect(() => {

    // }, []);

    return (
        <div className="w-full rounded-2xl flex-1 flex flex-col min-w-80 bg-gray-200 p-3">
            <div className="flex justify-end items-center p-2 border-b border-black">
                <Link className="w-7 h-7 rounded-full bg-blue-600 text-white text-center" href="/protected/reset-password">
                    R
                </Link>
                {/* <SubmitButton formAction={signOutAction}>L</SubmitButton> */}
            </div>
            <div className="flex justify-end items-center p-2">
                <Button onClick={addNewAsset}>Add Asset</Button>
            </div>
            <div className="w-full h-[200px] rounded-sm bg-white">
                {/* <Chart options={options} series={options.series} type="line" /> */}
            </div>
            <div className="w-full">
                <Button.Group className="p-2 pl-4">
                    <Button color="dark">Tot</Button>
                    <Button color="dark">Liquidità</Button>
                    <Button color="dark">investimenti</Button>
                </Button.Group>
            </div>
            <div className="w-full h-[360px] border rounded-sm border-black bg-white overflow-scroll">
                <AccordionTemp accordionData={accordionData}  state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />          
            </div>
            <ModalTemp listData={listData} state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}
