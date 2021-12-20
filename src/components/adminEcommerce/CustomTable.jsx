import { ArrowRightAlt } from "@mui/icons-material";
import { Box, ButtonBase, Stack, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { StyledPagination } from "components/dataTable/dataTableV2/styledComponents";
import FlexBox from "components/FlexBox";
import { H5 } from "components/Typography";
import { useMemo } from "react";
import { useExpanded, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import ScrollBar from "simplebar-react"; // component props interface

const CustomTable = props => {
  const {
    data,
    rowClick,
    showFooter,
    columnShape,
    hidePagination
  } = props; // hooks

  const theme = useTheme();
  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(() => columnShape, [columnShape]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage
  } = useTable({
    columns,
    data: tableData
  }, useSortBy, useExpanded, usePagination, useRowSelect); // handle pagination

  const handleChange = (_e, currentPageNo) => {
    gotoPage(currentPageNo - 1);
  }; // table border color


  const borderColor = theme.palette.mode === "light" ? "text.secondary" : "divider";
  return <Box>
      <ScrollBar>
        <Table {...getTableProps()} sx={{
        borderSpacing: "0 1rem",
        borderCollapse: "separate"
      }}>
          <TableHead>
            {headerGroups.map(headerGroup => <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} sx={{
              paddingY: 0,
              fontSize: 13,
              fontWeight: 600,
              borderBottom: 0,
              color: "text.disabled",
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              "&:last-child": {
                textAlign: "center"
              }
            }}>
                    {column.render("Header")}
                  </TableCell>)}
              </TableRow>)}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
            prepareRow(row);
            return <TableRow {...row.getRowProps()} onClick={rowClick && rowClick(row.original)} sx={{
              backgroundColor: "background.paper",
              cursor: rowClick ? "pointer" : "unset",
              "& td:first-of-type": {
                borderLeft: "1px solid",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                borderColor
              },
              "& td:last-of-type": {
                textAlign: "center",
                borderRight: "1px solid",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                borderColor
              },
              "&:last-of-type .MuiTableCell-root": {
                borderBottom: theme.palette.mode === "dark" ? `1px solid ${theme.palette.divider} !important` : `1px solid ${theme.palette.text.secondary} !important`
              }
            }}>
                  {row.cells.map(cell => <TableCell {...cell.getCellProps()} sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "text.disabled",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor
              }}>
                      {cell.render("Cell")}
                    </TableCell>)}
                </TableRow>;
          })}
          </TableBody>
        </Table>
      </ScrollBar>

      {!hidePagination && <Stack alignItems="flex-end" marginY={1}>
          <StyledPagination count={pageOptions.length} shape="rounded" onChange={handleChange} />
        </Stack>}

      {showFooter && <FlexBox alignItems="center" justifyContent="space-between">
          <H5 color="text.disabled">Showing 1-12 of 24 result</H5>
          <ButtonBase disableRipple sx={{
        fontSize: 14,
        fontWeight: 600
      }}>
            See All
            <ArrowRightAlt sx={{
          marginLeft: 0.5
        }} />
          </ButtonBase>
        </FlexBox>}
    </Box>;
};

export default CustomTable;