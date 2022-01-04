import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Rating, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Tiny } from "components/Typography";
import { useState } from "react"; // styled component
import { useTranslation } from "react-i18next";

const MuiAccordion = styled(Accordion)(() => ({
  marginTop: 10, "&:not(:last-child)": { borderBottom: 0 }, "&:before": { display: "none" }, "&.Mui-expanded": { margin: 0, marginTop: 10 }
}));

const ModalAccordion = ({ item }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState("panel2");

  const handleExpand = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <>
    <MuiAccordion square disableGutters elevation={0} expanded={expanded === "panel1"} onChange={handleExpand("panel1")}>
      <AccordionSummary expandIcon={<ExpandMore color="disabled" />}>
        <H5>{t("Description")}</H5>
      </AccordionSummary>
      <Tiny fontWeight={500} lineHeight={1.7} display="block">
        {item.description}
      </Tiny>
    </MuiAccordion>

    <MuiAccordion expanded={expanded === "panel2"} onChange={handleExpand("panel2")}>
      <AccordionSummary expandIcon={<ExpandMore color="disabled" />}>
        <H5>{`${t("Reviews")} (${item.totalReviews || 0})`}</H5>
      </AccordionSummary>
      {/* ALTERAR QUANDO EXISTIREM COMENTARIOS */}
      {[].map(() => (<Box paddingTop={1}>
        <FlexBox justifyContent="space-between" alignItems="center">
          <FlexBox alignItems="center">
            <Box sx={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", backgroundColor: "error.main", marginRight: 1 }}>
              <img src="/static/avatar/001-man.svg" width="100%" alt="" />
            </Box>
            <Tiny fontWeight={500} lineHeight={1.7} marginTop={1.5} display="block">
              Tom Cruise
            </Tiny>
          </FlexBox>

          <Rating name="read-only" size="small" value={5} readOnly />
        </FlexBox>

        <Tiny fontWeight={500} lineHeight={1.7} marginTop={1.5} display="block">
          The shoe body is hard and needs to adapt to each other for a period
          of time. I like it very much, I have to go a long way with it
        </Tiny>
      </Box>))}
    </MuiAccordion>
  </>;
};

export default ModalAccordion;