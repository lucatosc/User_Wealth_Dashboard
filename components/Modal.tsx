import { Button, Label, Modal, TextInput, Dropdown, Select } from "flowbite-react";
import { TableData, TableTemp } from "./Table";
import { useEffect, useState } from "react";


type Props = {
    listData: TableData;
    state: string;
    setState: any;
    openModal: boolean;
    setOpenModal: any;
    bankList: string [];
    checked: number;
    setChecked: any;
    account: string; 
    setAccount: any;
    amount: number;
    setAmount: any; 
    newDate: Date; 
    setNewDate: any;
};

export const ModalTemp: React.FC<Props> = ({
    listData, state, setState, openModal, setOpenModal, bankList, setChecked
  }: Props) => {

    const addLiquidita = () => {
        setState("");
        setOpenModal(false);
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
                            bankList.map((user, index) => <option key={index} onClick={() => setDropDown(user)}>{user}</option>) : 
                            <option>No Account Available</option>}
                        </Select>
                    </div>
                    <div>
                        <div className="text-blue-600 cursor-pointer" onClick={setAddAccount}>Add new account</div>
                    </div>
                    <div>
                        <Label htmlFor="amount" value="Amount" />
                        <TextInput id="account" type="number" required />
                    </div>
                    <div>
                        <Label htmlFor="date" value="Date" />
                        <TextInput id="date" type="date" required />
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
                            bankList.map(user => <option onClick={() => setDropDown(user)}>{user}</option>) : 
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
                        <Label htmlFor="date" value="Date" />
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
                        <TextInput id="account" type="text" required />
                    </div>
                    <div className="w-full">
                        <Button onClick={addAccount}>Add</Button>
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
