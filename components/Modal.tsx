import { Button, Label, Modal, TextInput } from "flowbite-react";
import { TableData } from "./Table";
import { TableTemp } from "./Table";

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
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput id="password" type="password" required />
                    </div>
                    <div className="w-full">
                        <Button>Log in to your account</Button>
                    </div>
                </div>
            </Modal.Body>}
        </Modal>
    );
}
