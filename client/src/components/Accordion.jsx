import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyAccordion = ({ header, children }) => {
  return (
    <div className="p-4">
      <Accordion className="border border-main">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex justify-center items-center gap-4">
            <div className="text-2xl font-medium">{header}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="w-full flex flex-wrap gap-4">
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyAccordion;
