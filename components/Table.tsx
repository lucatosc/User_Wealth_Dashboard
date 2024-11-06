import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getDateNow } from "./mainPage";
import { MdArrowForwardIos } from "react-icons/md";

export type TableData =
    {
        mainCategory: number,
        childCategory: string,
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
    checkCateId?: string;
    setCheckCateId?: any;
    purchase: number;
    setPurchasePrice: any;
    history: number;
    setHistoricalPrice: any;
    square: number;
    setSquare: any;
    city: string;
    setCity: any;
    address: string;
    setAddress: any;
    newIban: string;
    setNewIban: any;
};

export const TableTemp: React.FC<Props> = ({
    tableData, state, setState, checked, setOpenModal, setChecked, setAccount, setNewDate, setAmount, checkCateId, setCheckCateId,
    purchase, setPurchasePrice, history, setHistoricalPrice, square, setSquare, city, setCity, address, setAddress, newIban, setNewIban,
  }: Props) => {

    const editData = (mainCate: number, _account: string, _newDate: string, _amount: string, id: string, val1?: any, val2?: any, val3?: any, val4?: any) => {
        setState("Add Update Liquidita");
        setOpenModal(true);
        setCheckCateId(id);
        setChecked(mainCate);
        setAccount(_account);
        setAmount(parseFloat(_amount));
        setNewDate(_newDate);
        if(checked === 2 || checked === 4) {
            setPurchasePrice(_amount);
            setHistoricalPrice(val1);
            setSquare(val2);
            setCity(val3);
            setAddress(val4);
        }
    }

    const deleteData = (mainCate: number, id: string) => {
        setState("Confirm");
        setOpenModal(true);
        setCheckCateId(id);
        setChecked(mainCate);
    }

    const setModal = (index: number) => {
        if(state === "Add New Asset") {
            setState("Add New Liquidita");
            setOpenModal(true);
            setChecked(index);
            setAccount("");
            setAmount(0);
            setNewDate(getDateNow());
        }
    }

    return (
        <Table striped>
            {state === "" && <TableHead>
                {tableData?.title.length > 0 ? 
                    tableData.title.map((item, index) => <TableHeadCell className="max-[426px]:p-2" style={{padding: '0.5rem'}} key={index}>{item}</TableHeadCell>)
                    : <TableHeadCell>No Data</TableHeadCell>
                }
                <TableHeadCell />
            </TableHead>}
            <TableBody>
                {tableData && tableData.content.length > 0 ? 
                    tableData.content.map((item, index) => (
                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={e => setModal(index)}>
                            {item.map((val, cellIndex) =>
                                cellIndex < 2 && <TableCell key={cellIndex} className="max-[426px]:p-2 text-wrap text-lg font-medium text-gray-900 dark:text-white">
                                    {val}
                                </TableCell>
                            )}
                            {state === "" && <TableCell className="min-[426px]:flex justify-end max-[425px]:p-2 items-center">
                                {(checked === 0 || checked === 1 || checked === 3) && <FaEdit className="max-[425px]:m-1 mr-4 hover:cursor-pointer" size={20} onClick={() => editData(tableData.mainCategory, tableData.childCategory, item[0], item[1], item[2])}/>}
                                {(checked === 2 || checked === 4) && <FaEdit className="max-[425px]:m-1 mr-4 hover:cursor-pointer" size={20} onClick={() => editData(tableData.mainCategory, tableData.childCategory, item[0], item[1], item[2], item[3], item[4], item[5], item[6])}/>}
                                <FaTrash className="hover:cursor-pointer" size={20} onClick={() => deleteData(tableData.mainCategory, item[2])}/>
                            </TableCell>}
                            {state === "Add New Asset" && <TableCell className="flex justify-end" >
                                <MdArrowForwardIos size={20} className="cursor-pointer" />
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
