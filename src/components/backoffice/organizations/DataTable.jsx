import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import BlankCheckBoxIcon from "icons/BlankCheckBoxIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { useFilters, usePagination, useRowSelect, useTable } from "react-table";
import ScrollBar from "simplebar-react";
import columnShape from "./columnShape";

// ################## STYLED COMPONENTS ############################
import { alpha, InputBase, Pagination, styled } from "@mui/material";
import SearchIcon from "icons/SearchIcon";

const StyledTableBodyRow = styled(TableRow)(({ theme, selected_row }) => selected_row === "select" ? {
  backgroundColor: alpha(theme.palette.primary.light, 0.5), position: "relative",
  "&::after": { top: 0, left: 0, width: "3px", content: '""', height: "100%", position: "absolute", backgroundColor: theme.palette.primary.main }
} : {});

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": { fontSize: 12, fontWeight: 500, color: theme.palette.text.disabled },
  "& .MuiPaginationItem-page:hover": {
    borderRadius: 20, backgroundColor: "transparent", color: theme.palette.primary.main, border: `1px solid ${theme.palette.primary.main}`
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    borderRadius: 20, backgroundColor: "transparent", color: theme.palette.primary.main, border: `1px solid ${theme.palette.primary.main}`
  },
  "& .MuiPaginationItem-previousNext": {
    margin: 10, borderRadius: 20, color: theme.palette.primary.main, border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": { backgroundColor: "transparent" }
  }
}));
const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  height: 40, fontSize: 12, maxWidth: 450, width: "100%", fontWeight: 500,
  padding: "0.5rem", borderRadius: "4px", backgroundColor: "white", color: theme.palette.text.primary
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  fontSize: 16, marginLeft: "0.5rem", marginRight: "0.5rem", color: theme.palette.primary.main
}));
// ################## END - STYLED COMPONENTS ############################

const SelectCheckBox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    if (resolvedRef) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);
  return <Checkbox {...rest} ref={resolvedRef} disableRipple checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />} icon={<BlankCheckBoxIcon fontSize="small" color="primary" />} />;
});

function SearchFilter({ column }) {
  const { filterValue, setFilter } = column;
  const theme = useTheme();
  return <StyledSearchInput value={filterValue || ""} onChange={e => setFilter(e.target.value)} startAdornment={<StyledSearchIcon sx={{
    color: "text.disabled"
  }} />} sx={{
    backgroundColor: theme.palette.mode === "light" ? "#ECEFF5" : theme.palette.divider,
    borderRadius: "8px"
  }} />;
}

const DataTable = ({ data, clearFilter, handleRowSelect, onFilterChange }) => {
  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(() => columnShape, []);
  const defaultColumn = useMemo(() => ({
    Filter: SearchFilter
  }), []);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, pageOptions,
    gotoPage, state, setAllFilters, selectedFlatRows } = useTable({ columns, defaultColumn, data: tableData },
      useFilters, usePagination, useRowSelect, hooks => {
        hooks.visibleColumns.push(columns => [{
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => <SelectCheckBox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => {
            return <SelectCheckBox {...row.getToggleRowSelectedProps()} />;
          }
        }, ...columns]);
      });
  useEffect(() => {
    handleRowSelect(selectedFlatRows);
  }, [selectedFlatRows, handleRowSelect]);
  useEffect(() => {
    setAllFilters([]);
  }, [clearFilter, setAllFilters]);
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(state.filters);
    }
  }, [onFilterChange, state.filters]); // handle pagination

  const handleChange = (_, currentPageNo) => {
    gotoPage(currentPageNo - 1);
  };

  const selectedRow = selectId => {
    const rowId = Object.keys(state.selectedRowIds);
    const findId = rowId.find(id => id === selectId);
    if (findId) return true;
    return false;
  };

  return <Box>
    <ScrollBar>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => <TableCell {...column.getHeaderProps()} sx={{
              fontSize: 12,
              fontWeight: 600,
              minWidth: column.minWidth,
              borderColor: "secondary.300"
            }}>
              {column.render("Header")}
              {column.canFilter ? column.render("Filter") : null}
            </TableCell>)}
          </TableRow>)}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return <StyledTableBodyRow {...row.getRowProps()} selected_row={selectedRow(row.id) ? "select" : ""}>
              {row.cells.map(cell => <TableCell {...cell.getCellProps()} sx={{
                fontSize: 12,
                fontWeight: 500,
                borderColor: "secondary.300"
              }}>
                {cell.render("Cell")}
              </TableCell>)}
            </StyledTableBodyRow>;
          })}
        </TableBody>
      </Table>
    </ScrollBar>

    <Stack alignItems="center" marginY="1rem">
      <StyledPagination shape="rounded" onChange={handleChange} count={pageOptions.length} />
    </Stack>
  </Box>;
};

export default DataTable;