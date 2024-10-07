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
};

export const TableTemp: React.FC<Props> = ({
    tableData, state
  }: Props) => {

    // const editData = () => {

    // }

    // const deleteData = () => {
        
    // }

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
                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {item.map((val, cellIndex) =>
                                <TableCell key={cellIndex} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {val}
                                </TableCell>
                            )}
                            {state === "1" && <TableCell className="flex justify-end">
                                <FaEdit className="pr-1"/>
                                <FaTrash/>
                            </TableCell>}
                            {state === "2" && <TableCell className="flex justify-end">
                                <div>{">"}</div>
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
