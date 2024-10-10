import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { TableTemp, TableData } from "./Table";
import { FaPlus } from 'react-icons/fa';
import { on } from "events";

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
    state: string;
    setState: any;
    openModal: boolean;
    setOpenModal: any;
};

export const AccordionTemp: React.FC<Props> = ({
    accordionData, state, setState, openModal, setOpenModal
  }: Props) => {

    const addLiquidita = () => {
        setState("Add New Liquidita");
        setOpenModal(true);
    }

    return (
        accordionData.map((acco, index) => 
            <Accordion key={index}>
                <AccordionPanel>
                    <AccordionTitle className="flex-row-reverse">
                        <div className="flex items-center justify-between" style={{width: 'calc(100vw - 160px)'}}>
                            <div>{acco.title.name}</div>
                            <div className="flex items-center">
                                <div className="pr-4">{acco.title.price}</div>
                                <div><FaPlus onClick={addLiquidita}/></div>
                            </div>
                        </div>
                    </AccordionTitle>
                    <AccordionContent>
                        {acco.content.map((_acco, index) => 
                            <Accordion key={index} className="mb-1">
                                <AccordionPanel>
                                    <AccordionTitle className="flex flex-row-reverse">
                                        <div className="flex items-center justify-between" style={{width: 'calc(100vw - 200px)'}}>
                                            <div>{_acco.title.name}</div>
                                            <div className="flex items-center">
                                                <div className="pr-4">{_acco.title.price}</div>
                                                <div><FaPlus onClick={addLiquidita}/></div>
                                            </div>
                                        </div>
                                    </AccordionTitle>
                                    {_acco.table && <AccordionContent className="p-0">
                                        <TableTemp tableData={_acco.table} state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal}/>
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
