"use client";
import { AccordionTemp } from "@/components/Accordion";
import { Button, Checkbox, Label } from "flowbite-react";
import { accordionData, listData, userlist } from "@/components/example";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { ModalTemp } from "./Modal";
import { LineChart } from '@mui/x-charts/LineChart';

export function MainPage() {
    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState("");

    const addNewAsset = () => {
        setState("Add New Asset");
        setOpenModal(true);
    }

    return (
        <div className="w-full flex-1 flex flex-col min-w-80 bg-[#ebf2f3] p-5">
            <div className="flex justify-end items-center pr-2 pb-2 border-b border-[#8be2ee]">
                <Link className="w-7 h-7 rounded-full bg-cyan-400 text-white text-center" href="/protected/reset-password">
                    R
                </Link>
                {/* <SubmitButton formAction={signOutAction}>L</SubmitButton> */}
            </div>
            <div className="flex justify-end items-center p-2">
                <Button gradientDuoTone="cyanToBlue" size="xs" onClick={addNewAsset}>Add Asset</Button>
            </div>
            <div className="w-full h-[300px] rounded-lg bg-white">
                <LineChart
                    series={[
                        { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
                        { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
                    ]}
                />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 py-3">
                <div className="text-center">
                    <Checkbox id="total" />
                    <Label className="ml-2" htmlFor="total">Total</Label>
                </div>
                <div className="text-center">
                    <Checkbox id="liquidita" />
                    <Label className="ml-2" htmlFor="liquidita">Liquidita</Label>
                </div>
                <div className="text-center">
                    <Checkbox id="investimenti" />
                    <Label className="ml-2" htmlFor="investimenti">Investimenti</Label>
                </div>
                <div className="text-center">
                    <Checkbox id="immobiliare" />
                    <Label className="ml-2" htmlFor="immobiliare">Immobiliare</Label>
                </div>
                <div className="text-center">
                    <Checkbox id="altenativi" />
                    <Label className="ml-2" htmlFor="altenativi">Altenativi</Label>
                </div>
                <div className="text-center">
                    <Checkbox id="passivita" />
                    <Label className="ml-2" htmlFor="passivita">Passivita</Label>
                </div>
            </div>
            <div className="w-full h-[350px] p-2 rounded-lg bg-white overflow-y-auto">
                <AccordionTemp accordionData={accordionData}  state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />          
            </div>
            <ModalTemp listData={listData} userlist={userlist} state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}
