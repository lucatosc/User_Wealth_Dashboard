"use client";
import { AccordionTemp } from "@/components/Accordion";
import { Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { ModalTemp } from "./Modal";
import { LineChart } from '@mui/x-charts/LineChart';
import { createClient } from '@supabase/supabase-js';
import { TableData } from "@/components/Table";
import { AccordionData } from "@/components/Accordion";
import Button from "@mui/material/Button";
import { Menu } from "./menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/userSlice";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const listData : TableData = {
    mainCategory: 0,
    childCategory: "",
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

export const getDateNow = () => {
    const now = new Date(Date.now()); // Get the current date
    const year = String(now.getFullYear()).slice(0); // Get last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with 0
    const day = String(now.getDate()).padStart(2, '0'); // Get the date and pad with 0

    return `${year}-${month}-${day}`; // Format the date into YY-MM-DD
}

export function MainPage() {
    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState("");
    const [accordionData, setAccordionData] = useState <AccordionData []>(initAccordionData);
    const [checked, setChecked] = useState <number> (0);
    const [checkCateId, setCheckCateId] = useState <string> ("");
    const [account, setAccount] = useState <string> ("");
    const [amount, setAmount] = useState <number> (0);
    const [newDate, setNewDate] = useState <any> (getDateNow());
    const [newAccount, setNewAccount] = useState <string> ("");
    const [myTotalAmount, setMyTotalAmount] = useState <number> (0);
    const [chartList, setChartList] = useState<boolean[]>([true, true, true, true, true, true]);
    const [series, setSeries] = useState<any[]>([]);
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state: RootState) => state.user);

    console.log("user   ====>>>>> ", user);

    useEffect(() => {
        const fetchData = async() => {
            let { data, error } = await supabase
                .from('User')
                .select('*')
                .eq('login', 'TRUE');

            if(data) dispatch(setUser(data[0]));

            console.log("currentData => ", data);
        }

        fetchData();
    }, [dispatch])

    const addNewAsset = () => {
        setState("Add New Asset");
        setOpenModal(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data from Supabase...");

            let Chart0 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let Chart1 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let Chart2 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let Chart3 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let Chart4 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let Chart5 : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            
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
            
            let _myTotalAmount: number = 0;

            //Liquidity
            
            let totalAmount : number = 0;

            let { data: Liquidity_users, error: liquidity_error } = await supabase
                .from('Liquidity_users')
                .select(`*, Bank_accounts(name)`)
                .eq('user_id', user?.id);

            if (liquidity_error) {
                console.log("Error fetching data:", liquidity_error);
            } else {
                console.log("Fetched Liquidity_Users:", Liquidity_users);
                if (Liquidity_users && Liquidity_users !== null) {
                    totalAmount = 0;
                    
                    let bankArray: string [] = [];
                    Liquidity_users?.forEach(item => {
                        if(bankArray.includes(item?.Bank_accounts?.name) === false) bankArray.push(item?.Bank_accounts?.name); 
                    });

                    bankArray.sort();

                    bankArray.forEach(bank => {
                        let temp: any [] = [];
                        let tableData : TableData = {mainCategory: 0, childCategory: bank, title: ["Date", "Impoto"], content: []};
                        let bankAmount : number = 0;

                        Liquidity_users?.forEach(item => {
                            if(item?.Bank_accounts?.name === bank) {
                                temp.push(item);
                                tableData.content.push([item.date, item.amount, item.id]);
                                bankAmount += item.amount;

                                let month = parseInt(item.date.slice(5, 7));
                                Chart1[month - 1] += item.amount;
                                Chart0[month - 1] += item.amount;
                            }
                        });

                        _accordionData[0].content.push({
                            title: {name: bank, price: bankAmount + ""},
                            table: tableData
                        })

                        totalAmount += bankAmount;
                    })

                    _accordionData[0].title.price = totalAmount + "";
                }
            }
            _myTotalAmount += totalAmount;

            //Investimenti
            let { data: Investments_users, error: Investments_error } = await supabase
                .from('Investments_users')
                .select(`*, Investments(name)`)
                .eq('user_id', user?.id);

            if (Investments_error) {
                console.log("Error fetching data:", Investments_error);
            } else {
                console.log("Fetched Investements_Users:", Investments_users);
                if (Investments_users && Investments_users !== null) {
                    totalAmount = 0;
                    
                    let InvArray: string [] = [];
                    Investments_users?.forEach(item => {
                        if(InvArray.includes(item?.Investments?.name) === false) InvArray.push(item?.Investments?.name); 
                    });

                    InvArray.sort();

                    InvArray.forEach(inv => {
                        let temp: any [] = [];
                        let tableData : TableData = {mainCategory: 0, childCategory: inv, title: ["Date", "Impoto"], content: []};
                        let invAmount : number = 0;

                        Investments_users?.forEach(item => {
                            if(item?.Investments?.name === inv) {
                                temp.push(item);
                                tableData.content.push([item.date, item.quantity, item.id]);
                                invAmount += item.quantity;

                                let month = parseInt(item.date.slice(5, 7));
                                Chart2[month - 1] += item.quantity;
                                Chart0[month - 1] += item.quantity;
                            }
                        });

                        _accordionData[1].content.push({
                            title: {name: inv, price: invAmount + ""},
                            table: tableData
                        })

                        totalAmount += invAmount;
                    })

                    _accordionData[1].title.price = totalAmount + "";
                }
            }
            _myTotalAmount += totalAmount;
            
            //Immobiliare
            
            //Altenativi
            let { data: Alternative_users, error: Alternative_error } = await supabase
                .from('Alternative_users')
                .select(`*, Alternatives(name)`)
                .eq('user_id', user?.id);

            if (Alternative_error) {
                console.log("Error fetching data:", Alternative_error);
            } else {
                console.log("Fetched Alternative_Users:", Alternative_users);
                if (Alternative_users && Alternative_users !== null) {
                    totalAmount = 0;
                    
                    let altArray: string [] = [];
                    Alternative_users.forEach(item => {
                        if(altArray.includes(item?.Alternatives?.name) === false) altArray.push(item?.Alternatives?.name); 
                    });

                    altArray.sort();

                    altArray.forEach(alt => {
                        let temp: any [] = [];
                        let tableData : TableData = {mainCategory: 0, childCategory: alt, title: ["Date", "Impoto"], content: []};
                        let altAmount : number = 0;

                        Alternative_users?.forEach(item => {
                            if(item?.Alternatives?.name === alt) {
                                temp.push(item);
                                tableData.content.push([item.date, item.value, item.id]);
                                altAmount += item.value;

                                let month = parseInt(item.date.slice(5, 7));
                                Chart4[month - 1] += item.value;
                                Chart0[month - 1] += item.value;
                            }
                        });

                        _accordionData[3].content.push({
                            title: {name: alt, price: altAmount + ""},
                            table: tableData
                        })

                        totalAmount += altAmount;
                    })

                    _accordionData[3].title.price = totalAmount + "";
                }
            }
            _myTotalAmount += totalAmount;
            
            //Passivita

            setAccordionData(_accordionData);

            let temp_list: any[] = [];
            if(chartList[0]) temp_list.push({curve: "linear", color: 'red', data: Chart0});
            if(chartList[1]) temp_list.push({curve: "linear", color: 'green', data: Chart1});
            if(chartList[2]) temp_list.push({curve: "linear", color: 'blue', data: Chart2});
            if(chartList[3]) temp_list.push({curve: "linear", color: 'yellow', data: Chart3});
            if(chartList[4]) temp_list.push({curve: "linear", color: 'purple', data: Chart4});
            if(chartList[5]) temp_list.push({curve: "linear", color: 'gray', data: Chart5});

            setSeries(temp_list);
            setMyTotalAmount(_myTotalAmount);
        };
    
        fetchData();

    }, [state, checked, chartList, loading]);

    const handleChange = (index: number) => {
        let list = chartList.slice(0);
        list[index] = (list[index] === false);
        setChartList(list);
    }

    return (
        <div className="w-full flex-1 flex flex-col min-w-80 bg-[#f9fbfc] p-5">
            <div className="flex justify-end z-10 items-center border-b boder-[#dfe3eb]">
                <Menu />
            </div>
            <div className="flex justify-end items-center p-2">
                <Button variant="outlined" size="small" onClick={addNewAsset}>Add Asset</Button>
            </div>
            <div className="w-full h-[250px] rounded-lg bg-white border border-[#dfe3eb]">
                <LineChart
                    // xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }]}
                    xAxis={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12] }]}
                    series={series}
                />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-3 w-full p-3">
                <div className="text-left flex items-center">
                    <Checkbox color="red" id="total" checked={chartList[0]} onChange={e => handleChange(0)}/>
                    <Label className="ml-2 text-lg font-semibold" htmlFor="total">Total</Label>
                </div>
                <div className="text-left flex items-center">
                    <Checkbox color="green" id="liquidita" checked={chartList[1]} onChange={e => handleChange(1)} />
                    <Label className="ml-2 text-lg font-semibold" htmlFor="liquidita">Liquidita</Label>
                </div>
                <div className="text-left flex items-center">
                    <Checkbox color="blue" id="investimenti" checked={chartList[2]} onChange={e => handleChange(2)} />
                    <Label className="ml-2 text-lg font-semibold" htmlFor="investimenti">Investimenti</Label>
                </div>
                <div className="text-left flex items-center">
                    <Checkbox color="yellow" id="immobiliare" checked={chartList[3]} onChange={e => handleChange(3)} />
                    <Label className="ml-2 text-lg font-semibold" htmlFor="immobiliare">Immobiliare</Label>
                </div>
                <div className="text-left flex items-center">
                    <Checkbox color="purple" id="altenativi" checked={chartList[4]} onChange={e => handleChange(4)} />
                    <Label className="ml-2 text-lg font-semibold" htmlFor="altenativi">Altenativi</Label>
                </div>
                <div className="text-left flex items-center">
                    <Checkbox color="gray" id="passivita" checked={chartList[5]} onChange={e => handleChange(5)} />
                    <Label className="ml-2 text-lg font-semibold" htmlFor="passivita">Passivita</Label>
                </div>
            </div>
            <div className="w-full h-[40] rounded-t-lg bg-white text-xl font-semibold border border-[#dfe3eb] flex justify-between items-center px-8 py-4">
                <div className="text-2xl">Patrimonio</div>
                <div className="pl-8 text-2xl">€{myTotalAmount}</div>
            </div>
            <div className="w-full h-[320px] px-5 pt-5 pb-2 rounded-b-lg text-xl font-semibold bg-white overflow-y-scroll border border-[#dfe3eb] border-t-0">
                <AccordionTemp 
                    accordionData={accordionData} 
                    state={state} 
                    setState={setState} 
                    openModal={openModal} 
                    setOpenModal={setOpenModal}
                    checked={checked} 
                    setChecked={setChecked}
                    account={account} 
                    setAccount={setAccount}
                    amount={amount} 
                    setAmount={setAmount} 
                    newDate={newDate} 
                    setNewDate={setNewDate}
                    newAccount={newAccount} 
                    setNewAccount={setNewAccount}
                    checkCateId={checkCateId}
                    setCheckCateId={setCheckCateId}
                />          
            </div>
            <ModalTemp 
                listData={listData} 
                state={state} 
                setState={setState} 
                openModal={openModal} 
                setOpenModal={setOpenModal} 
                checked={checked} 
                setChecked={setChecked}
                account={account} 
                setAccount={setAccount}
                amount={amount} 
                setAmount={setAmount} 
                newDate={newDate} 
                setNewDate={setNewDate}
                newAccount={newAccount} 
                setNewAccount={setNewAccount}
                checkCateId={checkCateId}
                setCheckCateId={setCheckCateId}
            />
        </div>
    );
}
