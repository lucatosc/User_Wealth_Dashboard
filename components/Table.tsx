import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';


export type TableData =
    {
        title: string [],
        content: string [][]
    };

type Props = {
    tableData: TableData;
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
};

export const TableTemp: React.FC<Props> = ({
    tableData, state, setState, setOpenModal, setChecked, setAccount, setNewDate, setAmount, 
  }: Props) => {

    const editData = () => {
        setState("Add Update Liquidita");
        setOpenModal(true);
    }

    const deleteData = () => {
        setState("Confirm");
        setOpenModal(true);
    }

    const setModal = (index: number) => {
        if(state === "Add New Asset") {
            setState("Add New Liquidita");
            setOpenModal(true);
            setChecked(index);
            setAccount("");
            setAmount(0);
            setNewDate(Date.now());
        }
    }

    return (
        <Table striped>
            <TableHead>
                {tableData?.title.length > 0 ? 
                    tableData.title.map((item, index) => <TableHeadCell key={index}>{item}</TableHeadCell>)
                    : <TableHeadCell>No Data</TableHeadCell>
                }
                <TableHeadCell />
            </TableHead>
            <TableBody className="divide-y">
                {tableData && tableData.content.length > 0 ? 
                    tableData.content.map((item, index) => (
                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={e => setModal(index)}>
                            {item.map((val, cellIndex) =>
                                <TableCell key={cellIndex} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {val}
                                </TableCell>
                            )}
                            {state === "" && <TableCell className="flex justify-end">
                                <FaEdit className="mr-4" onClick={editData}/>
                                <FaTrash onClick={deleteData}/>
                            </TableCell>}
                            {state === "Add New Asset" && <TableCell className="flex justify-end" >
                                <div className="cursor-pointer">{">"}</div>
                            </TableCell>}
                        </TableRow>
                    ))
                    : (
                        <TableRow>
                            <TableCell colSpan={tableData ? tableData.title.length + 1 : 1} className="text-center">
                                No Data
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}
