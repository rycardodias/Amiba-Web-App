import FlexBox from "components/FlexBox";
import { Small, Tiny } from "components/Typography";

import { KeyboardArrowDown } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { InputBase, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { format } from "date-fns";
import { useMemo } from "react";
import i18next from "i18next";


const CommonCell = ({ title, body }) => <FlexBox flexDirection="column">
    <Small mb={0.5}>{title}</Small>
    <Tiny color="text.disabled">{body}</Tiny>
</FlexBox>;

function SelectColumnFilter({ column }) {
    const { filterValue, setFilter, preFilteredRows, id } = column;
    const theme = useTheme();
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => options.add(row.values[id]));
        return [...options.values()];
    }, [id, preFilteredRows]); // Render a multi-select box

    return <Select value={filterValue || ""} onChange={e => setFilter(e.target.value || undefined)} IconComponent={() => <KeyboardArrowDown color="disabled" />} input={<InputBase sx={{
        height: 40, width: 110, fontSize: 12, fontWeight: 600, padding: "0 8px",
        borderRadius: "8px", color: "text.primary",
        backgroundColor: theme.palette.mode === "light" ? "#ECEFF5" : "divider",
        "& .MuiPopover-paper": { boxShadow: "none" },
        "& > .MuiSelect-select": { paddingRight: "0 !important" }
    }} />}>
        <MenuItem value="" sx={{ fontSize: 12, fontWeight: 500 }}> {i18next.t("All")} </MenuItem>
        {options.map((option, i) => <MenuItem key={i} value={option.toString()} sx={{ fontSize: 12, fontWeight: 500 }}>
            {option.toString()}
        </MenuItem>)}
    </Select>;
}

function DateColumnFilter({ column }) {
    const { filterValue, setFilter } = column;
    const theme = useTheme();
    const handleChange = newValue => {
        const date = format(new Date(newValue), 'yyyy-MM-dd') || undefined;
        setFilter(date);
    };

    return <DatePicker value={filterValue || ""} onChange={handleChange} renderInput={params => {
        return <TextField {...params} disabled error={false} inputProps={{ placeholder: "" }} sx={{
            "& .MuiOutlinedInput-root": { height: 40, borderRadius: "8px", backgroundColor: theme.palette.mode === "light" ? "#ECEFF5" : "divider" },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiOutlinedInput-input": { padding: 0, paddingLeft: 1 },
            "& .MuiSvgIcon-root": { fontSize: 22, color: "text.disabled" }
        }} />;
    }} />;
}

export { CommonCell, SelectColumnFilter, DateColumnFilter }