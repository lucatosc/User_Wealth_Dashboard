import { Button, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import { TableData, TableTemp } from "./table";

type Props = {
    listData: TableData;
    state: string;
    openModal: boolean;
    setOpenModal: any;
};

export const ModalTemp: React.FC<Props> = ({
    listData, state, openModal, setOpenModal
  }: Props) => {

    // const editData = () => {

    // }

    // const deleteData = () => {
        
    // }

    return (
        <Modal show={openModal} size="" onClose={() => setOpenModal(false)}>
            
            {/* Add New Asset Modal} */}
            {state === "Add New Asset" && <Modal.Header>Add Assert</Modal.Header>}
            {state === "Add New Asset" && <Modal.Body>
                <TableTemp tableData={listData} state="2"/>
            </Modal.Body>}

            {/* Add New Liquidita */}
            {state === "Add New Liquidita" && <Modal.Header>Add Liquidita</Modal.Header>}
            {state === "Add New Liquidita" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="account" value="Account" />
                        <Dropdown id="account" label="Dropdown" inline aria-required>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Item>Sign out</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div>
                        <div className="text-blue-600">Add new account</div>
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
                        <Button>Add</Button>
                    </div>
                </div>
            </Modal.Body>}
            {state === "Add New Liquidita Account" && <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="amount" value="Amount Name" />
                        <TextInput id="account" type="text" required />
                    </div>
                    <div className="w-full">
                        <Button>Add</Button>
                    </div>
                </div>
            </Modal.Body>}
        </Modal>
    );
}
