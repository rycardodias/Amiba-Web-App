import { useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H2 } from "components/Typography";
import { useTranslation } from "react-i18next";

const Heading = ({ heading }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return <FlexBox alignItems="center" flexWrap="wrap" sx={{
    [theme.breakpoints.down(520)]: {
      flexDirection: "column-reverse", alignItems: "flex-start", "& .MuiInputBase-root": { maxWidth: "100%" },
      "& h2": { marginLeft: 0, marginBottom: 1 }
    }
  }}>
    <SearchInput placeholder={t("Find Products")} disabled/>
    <H2 marginLeft={2}>{t(heading)}</H2>
  </FlexBox>;
};

export default Heading;