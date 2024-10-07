import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { TableTemp, TableData } from "../components/Table";

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
                    <AccordionTitle className="flex justify-between">
                        <p>{acco.title.name}</p>
                        <p>{acco.title.price}</p>
                    </AccordionTitle>
                    <AccordionContent>
                        {acco.content.map((_acco, index) => 
                            <Accordion className="mb-1">
                                <AccordionPanel>
                                    <AccordionTitle className="flex justify-between">
                                        <p>{_acco.title.name}</p>
                                        <p>{_acco.title.price}</p>
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
