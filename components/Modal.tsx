import { Button, Label, Modal, TextInput, Dropdown, Select } from "flowbite-react";
import { TableData, TableTemp } from "./Table";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Props = {
    listData: TableData;
    state: string;
    setState: any;
    openModal: boolean;
    setOpenModal: any;
    bankList: string [];
    setBankList: any;
    checked: number;
    setChecked: any;
    account: string; 
    setAccount: any;
    amount: number;
    setAmount: any; 
    newDate: any; 
    setNewDate: any;
    newAccount: string;
    setNewAccount: any;
};

export const ModalTemp: React.FC<Props> = ({
    listData, state, setState, openModal, setOpenModal, bankList, setBankList, setChecked, account, setAccount,  amount, setAmount, newAccount, setNewAccount, newDate, setNewDate
  }: Props) => {
    const [totalBank, setTotalBank] = useState <any []> ([]);

    const addLiquidita = () => {
        setState("");
        setOpenModal(false);

        const checkedBankId = totalBank.filter(bank => bank.name === account);

        const fetchData = async () => {     
            const { data, error } = await supabase
                .from('Liquidity_users')
                .insert([
                    { date: newDate, amount: amount, currency: "EUR", user_id: '4c4b7b19-50b4-49b4-8283-06a2a0cbc44b', bank_account_id: checkedBankId[0].id },
                ])
                .select()
        }
    
        fetchData();
    }

    const updateLiquidita = () => {
        setState("");
        setOpenModal(false);
    }

    const setAddAccount = () => {
        setState("Add New Liquidita Account");
        setOpenModal(true);
    }
    
    const addAccount = () => {
        setState("Add New Liquidita");
        setOpenModal(true);
    }

    const cancelData = () => {
        setState("");
        setOpenModal(false);
    }
    
    const deleteData = () => {
        setState("");
        setOpenModal(false);
    }

    
    const addNewAccount = () => {
        const fetchData = async () => {     
            const { data: Bank_accounts, error: bank_error } = await supabase
                .from('Bank_accounts')
                .insert([
                    { name: newAccount },
                ])
                .select("name, id")
            
            if (bank_error) {
                console.error("Error fetching data:", bank_error);
            } else {
                if(Bank_accounts) {
                    let banks: string [] = Bank_accounts.map(item => item.name);
                    setBankList(banks);
                    setTotalBank(Bank_accounts);
                }
            }
        }

        fetchData();
    }

    const [dropDown, setDropDown] = useState("No Account Available");

    useEffect(() => {
        if(bankList && bankList?.length > 0) setDropDown(bankList[0]);
    }, [])

    return (
        <Modal show={openModal} size="sm" onClose={() => {setOpenModal(false); setState("")}}>
            
            {/* Add New Asset Modal} */}
            {state === "Add New Asset" && <Modal.Header>Add Assert</Modal.Header>}
            {state === "Add New Asset" && <Modal.Body>
                <TableTemp 
                    openModal={openModal} 
                    setOpenModal={setOpenModal} 
                    tableData={listData} 
                    state={state} 
                    setState={setState}
                    setChecked={setChecked}
                />
            </Modal.Body>}

            {/* Add New Liquidita */}
            {state === "Add New Liquidita" && <Modal.Header>Add Liquidita</Modal.Header>}
            {state === "Add New Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="account" value="Account" />
                        </div>
                        <Select id="account" required>
                            {bankList.length > 0 ? 
                            bankList.map((user, index) => <option key={index} onClick={() => setAccount(user)}>{user}</option>) : 
                            <option>No Account Available</option>}
                        </Select>
                    </div>
                    <div>
                        <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add new account</div>
                    </div>
                    <div>
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput id="account" type="number" required value={amount} onChange={e => setAmount(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="date" value="Date"/>
                        <TextInput id="date" type="date" required value={newDate} onChange={e => setNewDate(e.target.value)}/>
                    </div>
                    <div className="w-full items-center justify-center">
                        <Button onClick={addLiquidita}>Add</Button>
                    </div>
                </div>
            </Modal.Body>}

            {/* Add Update Liquidita */}
            {state === "Add Update Liquidita" && <Modal.Header>Add Liquidita</Modal.Header>}
            {state === "Add Update Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="account" value="Account" />
                        </div>
                        <Select id="account" required>
                            {bankList.length > 0 ? 
                            bankList.map(user => <option onClick={() => setAccount=(user)}>{user}</option>) : 
                            <option>No Account Available</option>}
                        </Select>
                    </div>
                    <div className="hover:cursor-pointer">
                        <div className="text-blue-600" onClick={setAddAccount}>Add new account</div>
                    </div>
                    <div>
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput id="account" type="number" required />
                    </div>
                    <div>
                        <Label htmlFor="date" value="Date"/>
                        <TextInput id="date" type="date" required />
                    </div>
                    <div className="w-full">
                        <Button onClick={updateLiquidita}>Add</Button>
                    </div>
                </div>
            </Modal.Body>}

            {/* Add New Liquidita Account*/}
            {state === "Add New Liquidita Account" && <Modal.Header>Add Liquidita Account</Modal.Header>}
            {state === "Add New Liquidita Account" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="amount" value="Account Name" />
                        <TextInput id="account" type="text" required value={newAccount} onChange={e => setNewAccount(e.target.value)}/>
                    </div>
                    <div className="w-full">
                        <Button onClick={addNewAccount}>Add</Button>
                    </div>
                </div>
            </Modal.Body>}

            {/* Confirm */}
            {state === "Confirm" && <Modal.Header>Conferma Delete</Modal.Header>}
            {state === "Confirm" && <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Sei sicuro di voler eliminare questo item?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="gray" onClick={cancelData}>
                      {"Cancel"}
                    </Button>
                    <Button color="failure" onClick={deleteData}>
                      {"Delete"}
                    </Button>
                  </div>
                </div>
              </Modal.Body>}
        </Modal>
    );
}