import { Button, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import { TableData, TableTemp } from "./Table";


type Props = {
    listData: TableData;
    state: string;
    setState: any;
    openModal: boolean;
    setOpenModal: any;
    userlist?: string [];
};

export const ModalTemp: React.FC<Props> = ({
    listData, state, setState, openModal, setOpenModal, userlist,
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

    return (
        <Modal show={openModal} size="sm" onClose={() => {setOpenModal(false); setState("")}}>
            
            {/* Add New Asset Modal} */}
            {state === "Add New Asset" && <Modal.Header>Add Assert</Modal.Header>}
            {state === "Add New Asset" && <Modal.Body>
                <TableTemp openModal={openModal} setOpenModal={setOpenModal} tableData={listData} state={state} setState={setState}/>
            </Modal.Body>}

            {/* Add New Liquidita */}
            {state === "Add New Liquidita" && <Modal.Header>Add Liquidita</Modal.Header>}
            {state === "Add New Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="account" value="Account" />
                        <Dropdown id="account" inline aria-required>
                            {userlist && userlist.map(user => <Dropdown.Item>{user}</Dropdown.Item>)}
                        </Dropdown>
                    </div>
                    <div>
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
                        <Button onClick={addLiquidita}>Add</Button>
                    </div>
                </div>
            </Modal.Body>}

            {/* Add Update Liquidita */}
            {state === "Add Update Liquidita" && <Modal.Header>Add Liquidita</Modal.Header>}
            {state === "Add Update Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="account" value="Account" />
                        <Dropdown id="account" inline aria-required>
                            {userlist && userlist.map(user => <Dropdown.Item>{user}</Dropdown.Item>)}
                        </Dropdown>
                    </div>
                    <div>
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
                        <Label htmlFor="amount" value="Amount Name" />
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
