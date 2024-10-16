"use client";
import { AccordionTemp } from "@/components/Accordion";
import { Button, Checkbox, Label } from "flowbite-react";
import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";
import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { ModalTemp } from "./Modal";
import { LineChart } from '@mui/x-charts/LineChart';
import { createClient } from '@supabase/supabase-js';
import { TableData } from "@/components/Table";
import { AccordionData } from "@/components/Accordion";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const listData : TableData = {
    title: [""],
    content: [["Liquidita"], ["Investimenti"], ["Immobiliare"], ["Altenativi"], ["Passivita"]]
};

export const initAccordionData: AccordionData [] = [
    {
        title: {name: "Liquidita", price: "0"},
        content: []
    },
    {
        title: {name: "Investimenti", price: "0"},
        content: []
    },
    {
        title: {name: "Immobiliare", price: "0"},
        content: []
    },
    {
        title: {name: "Alternativi", price: "0"},
        content: []
    },
    {
        title: {name: "Passivita", price: "0"},
        content: []
    },
];

export function MainPage() {

    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState("");
    const [bankList, setBankList] = useState <string[]>([]);
    const [accordionData, setAccordionData] = useState <AccordionData []>(initAccordionData);
    
    const [checked, setChecked] = useState <number> (0);
    const [account, setAccount] = useState <string> ("");
    const [amount, setAmount] = useState <number> (0);
    const [newDate, setNewDate] = useState <any> (Date.now());

    const addNewAsset = () => {
        setState("Add New Asset");
        setOpenModal(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data from Supabase...");
            
            //Bank
            let { data: Bank_accounts, error: bank_error } = await supabase
                .from('Bank_accounts')
                .select(`name`)
                
            if (bank_error) {
                console.error("Error fetching data:", bank_error);
            } else {
                if(Bank_accounts) {
                    let banks: string [] = Bank_accounts.map(item => item.name);
                    setBankList(banks);
                }
            }
            //Liquidity

            let _accordionData : AccordionData [] = [
                {
                    title: {name: "Liquidita", price: "0"},
                    content: []
                },
                {
                    title: {name: "Investimenti", price: "0"},
                    content: []
                },
                {
                    title: {name: "Immobiliare", price: "0"},
                    content: []
                },
                {
                    title: {name: "Alternativi", price: "0"},
                    content: []
                },
                {
                    title: {name: "Passivita", price: "0"},
                    content: []
                },
            ];
            let totalAmount : number = 0;
            
            console.log("initAccordionData => ", initAccordionData)

            let { data: Liquidity_users, error: liquidity_error } = await supabase
                .from('Liquidity_users')
                .select(`*, Bank_accounts(name)`)
                .eq('user_id', '4c4b7b19-50b4-49b4-8283-06a2a0cbc44b');

            if (liquidity_error) {
                console.error("Error fetching data:", liquidity_error);
            } else {
                console.log("Fetched Liquidity_Users:", Liquidity_users);
                if (Liquidity_users) {
                    totalAmount = 0;
                    
                    let bankArray: string [] = [];
                    Liquidity_users.forEach(item => {
                        if(bankArray.includes(item.Bank_accounts.name) === false) bankArray.push(item.Bank_accounts.name); 
                    });

                    bankArray.forEach(bank => {
                        let temp: any [] = [];
                        let tableData : TableData = {title: ["Date", "Impoto"], content: []};
                        let bankAmount : number = 0;

                        Liquidity_users.forEach(item => {
                            if(item.Bank_accounts.name === bank) {
                                temp.push(item);
                                tableData.content.push([item.date, item.amount]);
                                bankAmount += item.amount;
                            }
                        });

                        _accordionData[0].content.push({
                            title: {name: bank, price: bankAmount + ""},
                            table: tableData
                        })

                        totalAmount += bankAmount;
                    })

                    _accordionData[0].title.price = totalAmount + "";
                    console.log("_accordionData =>", _accordionData);
                }
            }

            //Investimenti

            //Immobiliare

            //Altenativi

            //Passivita

            console.log("_accordionData =>", _accordionData);
            setAccordionData(_accordionData);
        };
    
        fetchData();
    }, []);



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
            <div className="w-full h-[350px] p-3 rounded-lg bg-white overflow-y-scroll">
                <AccordionTemp accordionData={accordionData}  state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />          
            </div>
            <ModalTemp listData={listData} bankList={bankList} state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}
