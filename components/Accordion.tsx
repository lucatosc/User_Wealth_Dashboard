import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { TableTemp, TableData } from "./Table";
import { FaPlus } from 'react-icons/fa';

export type titleData = {
    name: string, price: string
};

export type contentData = {
    title: titleData, table: TableData
};

export type AccordionData =
    {
        title: titleData,
        content: contentData [],
    };

type Props = {
    accordionData: AccordionData [];
};

export const AccordionTemp: React.FC<Props> = ({
    accordionData,
  }: Props) => {
    return (
        accordionData.map((acco, index) => 
            <Accordion key={index} className="m-2">
                <AccordionPanel>
                    <AccordionTitle className="flex flex-row-reverse">
                        <Table className="w-80">
                            <TableHead>
                                <TableHeadCell className="w-40">{acco.title.name}</TableHeadCell>
                                <TableHeadCell className="w-32 text-right">{acco.title.price}</TableHeadCell>
                                <TableHeadCell className="w-8"><FaPlus/></TableHeadCell>
                            </TableHead>
                        </Table>
                    </AccordionTitle>
                    <AccordionContent>
                        {acco.content.map((_acco, index) => 
                            <Accordion className="mb-1">
                                <AccordionPanel>
                                    <AccordionTitle className="flex flex-row-reverse">
                                        <Table className="w-64">
                                            <TableHead>
                                                <TableHeadCell className="w-40">{_acco.title.name}</TableHeadCell>
                                                <TableHeadCell className="w-28 text-left">{_acco.title.price}</TableHeadCell>
                                                <TableHeadCell className="w-2"><FaPlus/></TableHeadCell>
                                            </TableHead>
                                        </Table>
                                    </AccordionTitle>
                                    {_acco.table && <AccordionContent className="p-0">
                                        <TableTemp tableData={_acco.table} state="1"/>
                                    </AccordionContent>}
                                </AccordionPanel>
                            </Accordion>
                        )}
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        )
    );
}
