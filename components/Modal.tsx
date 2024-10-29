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
    checkCateId: string;
    setCheckCateId: any;
};

export const ModalTemp: React.FC<Props> = ({
    listData, state, setState, openModal, setOpenModal, checked, setChecked, account, setAccount,  amount, setAmount, newAccount, setNewAccount, newDate, setNewDate, checkCateId, setCheckCateId
  }: Props) => {
    const [totalBank, setTotalBank] = useState <any []> ([]);
    const [bankList, setBankList] = useState <string[]>([]);

    const addLiquidita = () => {
        setState("");
        setOpenModal(false);

        const checkedBankId = totalBank.filter(bank => bank.name === account);

        const fetchData = async () => {
            if(checked === 0) {     
                const { data, error } = await supabase
                    .from('Liquidity_users')
                    .insert([
                        { date: newDate, amount: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id },
                    ])
                    .select()
            } else if(checked === 1) {
                const { data, error } = await supabase
                .from('Investments_users')
                .insert([
                    { date: newDate, quantity: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id },
                ])
                .select()
            } else if(checked === 2) {

            } else if(checked === 3) {
                const { data, error } = await supabase
                .from('Alternative_users')
                .insert([
                    { date: newDate, value: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id },
                ])
                .select()
            } else if(checked === 4) {

            }
        }
    
        fetchData();
    }

    const updateLiquidita = () => {
        setState("");
        setOpenModal(false);

        const checkedBankId = totalBank.filter(bank => bank.name === account);
        
        const fetchData = async () => {     
            if(checked === 0) {
                const { data, error } = await supabase
                    .from('Liquidity_users')
                    .update({ date: newDate, amount: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id })
                    .eq('id', checkCateId)
                    .select()
            } else if(checked === 1) {
                const { data, error } = await supabase
                    .from('Investments_users')
                    .update({ date: newDate, quantity: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id })
                    .eq('id', checkCateId)
                    .select()
            } else if(checked === 2) {
                
            } else if(checked === 3) {
                const { data, error } = await supabase
                    .from('Alternavie_users')
                    .update({ date: newDate, value: amount, currency: "EUR", user_id: user.id, bank_account_id: checkedBankId[0].id })
                    .eq('id', checkCateId)
                    .select()
            } else if(checked === 4) {

            }
        }
    
        fetchData();
    }
    
    const addAccount = () => {
        setState("Add New Liquidita Account");
        setOpenModal(true);
    }

    const cancelData = () => {
        setState("");
        setOpenModal(false);
    }
    
    const deleteData = () => {
        setState("");
        setOpenModal(false);
        
        const fetchData = async () => {     
            if(checked === 0) {
                const { error } = await supabase
                    .from('Liquidity_users')
                    .delete()
                    .eq('id', checkCateId)
            } else if(checked === 1) {
                const { error } = await supabase
                    .from('Investments_users')
                    .delete()
                    .eq('id', checkCateId)
            } else if(checked === 2) {
                
            } else if(checked === 3) {
                const { error } = await supabase
                    .from('Alternative_users')
                    .delete()
                    .eq('id', checkCateId)
            } else if(checked === 4) {

            }
        }

        fetchData();
    }

    
    const addNewAccount = () => {
        setState("Add New Liquidita");
        setOpenModal(true);

        const fetchData = async () => {     
            if(checked === 0) {
                const { data: Bank_accounts, error: bank_error } = await supabase
                    .from('Bank_accounts')
                    .insert([
                        { name: newAccount },
                    ])
                    .select()
                
                if (bank_error) {
                    console.error("Error fetching data:", bank_error);
                } else {
                    if(Bank_accounts) {
                        setAccount(newAccount);
                    }
                }
            } else if(checked === 1) {
                const { data: Investments, error: Investments_error } = await supabase
                .from('Investments')
                .insert([
                    { name: newAccount },
                ])
                .select()
            
            if (Investments_error) {
                console.error("Error fetching data:", Investments_error);
            } else {
                if(Investments) {
                    setAccount(newAccount);
                }
            }
            } else if(checked === 2) {

            } else if(checked === 3) {
                const { data: Altenatives, error: Alternatives_error } = await supabase
                    .from('Alternatives')
                    .insert([
                        { name: newAccount },
                    ])
                    .select()
                
                if (Alternatives_error) {
                    console.error("Error fetching data:", Alternatives_error);
                } else {
                    if(Altenatives) {
                        setAccount(newAccount);
                    }
                }
            } else if(checked === 4) {

            }
        }

        fetchData();
    }

    useEffect(() => {
        const fetchData = async () => {
            if(checked === 0) {
                //Bank
                let { data: Bank_accounts, error: bank_error } = await supabase
                .from('Bank_accounts')
                .select(`name, id`)
                
                if (bank_error) {
                    console.error("Error fetching data:", bank_error);
                } else {
                    if(Bank_accounts) {
                        let banks: string [] = Bank_accounts.map(item => item.name);
                        banks.sort();
                        setBankList(banks);
                        setTotalBank(Bank_accounts);
                        if(!account) setAccount(banks[0]);
                    }
                }
            } else if(checked === 1) {
                let { data: Investments, error: Investment_error } = await supabase
                .from('Investments')
                .select(`name, id`)
                
                if (Investment_error) {
                    console.error("Error fetching data:", Investment_error);
                } else {
                    if(Investments) {
                        let banks: string [] = Investments.map(item => item.name);
                        banks.sort();
                        setBankList(banks);
                        setTotalBank(Investments);
                        if(!account) setAccount(banks[0]);
                    }
                }
            } else if(checked === 2) {
                
            } else if(checked === 3) {
                let { data: Alternatives, error: alt_error } = await supabase
                .from('Alternatives')
                .select(`name, id`)
                
                if (alt_error) {
                    console.error("Error fetching data:", alt_error);
                } else {
                    if(Alternatives) {
                        let banks: string [] = Alternatives.map(item => item.name);
                        banks.sort();
                        setBankList(banks);
                        setTotalBank(Alternatives);
                        if(!account) setAccount(banks[0]);
                    }
                }
            } else if(checked === 4) {

            }
        }

        fetchData();
    }, [bankList])

    return (
        <Modal show={openModal} size="sm" onClose={() => {setOpenModal(false); setState("");}}>
            
            {/* Add New Asset Modal} */}
            {state === "Add New Asset" && <Modal.Header>Add Assert</Modal.Header>}
            {state === "Add New Asset" && <Modal.Body>
                <div className="border border-[#dfe3eb] rounded-lg">
                    <TableTemp 
                        openModal={openModal} 
                        setOpenModal={setOpenModal} 
                        tableData={listData} 
                        state={state} 
                        setState={setState}
                        checked={checked}
                        setChecked={setChecked}
                        account={account} 
                        setAccount={setAccount}
                        amount={amount} 
                        setAmount={setAmount} 
                        newDate={newDate} 
                        setNewDate={setNewDate}
                        checkCateId={checkCateId}
                        setCheckCateId={setCheckCateId}
                    />
                </div>
            </Modal.Body>}

            {/* Add New Liquidita */}
            {state === "Add New Liquidita" && (
                (checked === 0 && <Modal.Header>Add New Liquidita</Modal.Header>) || 
                (checked === 1 && <Modal.Header>Add New Investimento</Modal.Header>) || 
                (checked === 2 && <Modal.Header>Add New Immobiliare</Modal.Header>) ||
                (checked === 3 && <Modal.Header>Add New Alternativi</Modal.Header>) ||
                (checked === 4 && <Modal.Header>Add New Passivita</Modal.Header>)
            )}
            {state === "Add New Liquidita" && <Modal.Body>
                {(checked === 0 || checked === 1 || checked === 3) && <div className="space-y-6">
                    <div className="w-full">
                        <Label htmlFor="account" value="Account" />
                        <Select id="account" value={account} onChange={e => setAccount(e.target.value)} required>
                            {bankList.length > 0 ? 
                            bankList.map((user, index) => <option key={index} value={user}>{user}</option>) : 
                            <option>Empty data</option>}
                        </Select>
                        <div className="text-blue-600 cursor-pointer pt-2 pl-5" onClick={addAccount}>Add New Account</div>
                    </div>
                    <div>
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput id="amount" type="number" required value={amount} onChange={e => setAmount(e.target.value)}/>
                    </div>
                    <div className="w-full">
                        <Label htmlFor="currency" value="Currency" />
                        <Select id="currency" /*onChange={e => setCurrency(e.target.value)}*/ required>
                            <option value="EUR">{"EUR"}</option>
                            <option value="USD">{"USD"}</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="date" value="Date"/>
                        <TextInput id="date" type="date" required value={newDate} onChange={e => setNewDate(e.target.value)}/>
                    </div>
                    <div className="w-full items-center justify-center">
                        <Button onClick={addLiquidita}>Add</Button>
                    </div>
                </div>}

                {checked === 2 && <div className="space-y-6">
                    <div>
                        <Label htmlFor="purchase" value="Purchase Price" />
                        <TextInput id="purchase" type="number" required /*value={purchase} onChange={e => setPurchasePrice(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="history" value="Historical Price" />
                        <TextInput id="history" type="number" required /*value={history} onChange={e => setHistoricalPrice(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="purchaseDate" value="Purchase Date" />
                        <TextInput id="purchaseDate" type="date" required /*value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="square" value="Square Metres" />
                        <TextInput id="square" type="number" required /*value={square} onChange={e => setSquare(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="city" value="City" />
                        <TextInput id="city" type="text" required /*value={city} onChange={e => setCity(e.target.value)}*//>
                    </div>
                                   <div>
                        <Label htmlFor="address" value="Address" />
                        <TextInput id="address" type="text" required /*value={address} onChange={e => setAddress(e.target.value)}*//>
                    </div>
                    <div className="w-full items-center justify-center">
                        <Button onClick={addLiquidita}>Add</Button>
                    </div>
                </div>}

                {checked === 4 && <div className="space-y-6">
                    <div>
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput id="amount" type="number" required /*value={amount} onChange={e => setAmount(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="instalments" value="Instalments" />
                        <TextInput id="instalments" type="date" required /*value={instalments} onChange={e => setInstalments(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="interstType" value="Interst Type" />
                        <TextInput id="interstType" type="number" required /*value={interstType} onChange={e => setInterstType(e.target.value)}*//>
                    </div>
                    <div>
                        <Label htmlFor="interest" value="Interest" />
                        <TextInput id="interest" type="text" required /*value={interest} onChange={e => setInterest(e.target.value)}*//>
                    </div>
                                   <div>
                        <Label htmlFor="date" value="Date" />
                        <TextInput id="date" type="text" required /*value={date} onChange={e => setDate(e.target.value)}*//>
                    </div>
                    <div className="w-full items-center justify-center">
                        <Button onClick={addLiquidita}>Add</Button>
                    </div>
                </div>}
            </Modal.Body>}

            {/* Add Update Liquidita */}
            {state === "Add Update Liquidita" && ((checked === 0 && <Modal.Header>Update Liquidita</Modal.Header>) || 
                (checked === 1 && <Modal.Header>Update Investimenti</Modal.Header>) || 
                (checked === 2 && <Modal.Header>Update Immobiliare</Modal.Header>) ||
                (checked === 3 && <Modal.Header>Update Alternativi</Modal.Header>) ||
                (checked === 4 && <Modal.Header>Update Passivita</Modal.Header>))}
            {state === "Add Update Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div className="w-full">
                        <div className="mb-2 block">
                            {(checked === 0 && <Label htmlFor="account" value="Bank Name" />) || 
                            (checked === 1 && <Label htmlFor="account" value="Investment Name" />) || 
                            (checked === 2 && <Label htmlFor="account" value="Immobiliare Name" />) ||
                            (checked === 3 && <Label htmlFor="account" value="Alternative Name" />) ||
                            (checked === 4 && <Label htmlFor="account" value="Passivity Name" />)}
                        </div>
                        <Select id="account" value={account} onChange={e => setAccount(e.target.value)} required>
                            {bankList.length > 0 ? 
                            bankList.map((user, index) => <option key={index} value={user}>{user}</option>) : 
                            <option>Empty Data</option>}
                        </Select>
                    </div>
                    <div>
                        {
                            (checked === 0 && <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add New Bank Name</div>) || 
                            (checked === 1 && <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add New Investment Name</div>) || 
                            (checked === 2 && <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add New Immobiliare Name</div>) || 
                            (checked === 3 && <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add New Alternative Name</div>) || 
                            (checked === 4 && <div className="text-blue-600 cursor-pointer" onClick={addAccount}>Add New Passivity Name</div>)
                        }
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
                        <Button onClick={updateLiquidita}>Update</Button>
                    </div>
                </div>
            </Modal.Body>}

            {/* Add New Liquidita Account*/}
            {state === "Add New Liquidita Account" && ((checked === 0 && <Modal.Header>Add New Bank Account</Modal.Header>) || 
                (checked === 1 && <Modal.Header>Add New Investment Account</Modal.Header>) || 
                (checked === 3 && <Modal.Header>Add New Alternative Account</Modal.Header>))}
            {state === "Add New Liquidita Account" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="account" value="Account Name" />
                        <TextInput id="account" type="text" required value={newAccount} onChange={e => setNewAccount(e.target.value)}/>
                    </div>
                    {checked === 0 && <div>
                        <Label htmlFor="iban" value="Iban" />
                        <TextInput id="iban" type="text" required /*value={newIban} onChange={e => setNewIban(e.target.value)}*//>
                    </div>}
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