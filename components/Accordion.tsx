import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TableTemp, TableData } from "./Table";
import { FaPlus } from 'react-icons/fa';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


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

    const addLiquidita = (e : any) => {
        e.preventDefault();
        setState("Add New Liquidita");
        setOpenModal(true);
    }
    
    return (
        accordionData.map((acco, index) => 
            <Accordion key={index} className="mb-3 rounded-lg">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    {/* <Typography> */}
                        <div className="flex items-center justify-between" style={{width: 'calc(100vw - 120px)'}}>
                            <div>{acco.title.name}</div>
                            <div className="flex items-center">
                                <div className="pr-4">{acco.title.price}</div>
                                <div><FaPlus onClick={addLiquidita}/></div>
                            </div>
                        </div>
                    {/* </Typography> */}
                </AccordionSummary>
                <AccordionDetails style={{padding: "12px 0 12px 12px"}}>
                    {acco.content.length > 0 && acco.content.map((_acco, index) => 
                        <Accordion key={index} className="mb-3 rounded-lg rounded-r-none">
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                {/* <Typography> */}
                                    <div className="flex items-center justify-between" style={{width: 'calc(100vw - 140px)'}}>
                                        <div>{_acco.title.name}</div>
                                        <div className="flex items-center">
                                            <div className="pr-4">{_acco.title.price}</div>
                                        </div>
                                    </div>
                                {/* </Typography> */}
                            </AccordionSummary>
                            {_acco.table && <AccordionDetails style={{padding: "0"}}>
                                {/* <Typography> */}
                                    <TableTemp tableData={_acco.table} state={state} setState={setState} openModal={openModal} setOpenModal={setOpenModal}/>
                                {/* </Typography> */}
                            </AccordionDetails>}
                        </Accordion>
                    )}
                </AccordionDetails>
            </Accordion>
        )
    );
}
