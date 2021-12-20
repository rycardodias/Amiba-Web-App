import { Card, Divider, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import EditIconButton from "components/EditIconButton";
import FlexBox from "components/FlexBox";
import { H3, H5, H6 } from "components/Typography";
import ScrollBar from "simplebar-react"; // styled component

const StyledTableCell = styled(TableCell)(({
  theme
}) => ({
  padding: ".7rem 0",
  fontSize: 13,
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const InvoiceTab = () => {
  return <ScrollBar>
      <Box padding="1.5rem" sx={{
      minWidth: 700,
      overflow: "auto"
    }}>
        <FlexBox alignItems="center" justifyContent="space-between" mb={1.5}>
          <H3>Invoice</H3>
          <EditIconButton onClick={() => console.log("Edit")} />
        </FlexBox>

        <FlexBox alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="flex-end">
            <Card sx={{
            width: 142,
            height: 142,
            overflow: "hidden"
          }}>
              <img src="/static/products/nike.png" width="100%" height="100%" alt="" style={{
              objectFit: "cover"
            }} />
            </Card>

            <Box marginLeft={2}>
              <H5 lineHeight={1.8}>Nike airmax 270</H5>
              <H6 fontWeight={500} color="text.disabled">
                Rave BD
              </H6>
              <H6 fontWeight={500} color="text.disabled">
                UY7234
              </H6>
              <H6 fontWeight={500} color="text.disabled">
                Arizona USA
              </H6>
            </Box>
          </FlexBox>
          <H5>Date: 02.05.2021</H5>
        </FlexBox>

        <Box marginTop={2}>
          <Table>
            <TableHead>
              <TableRow sx={{
              "& th": {
                color: "text.disabled"
              },
              "& th:last-of-type": {
                textAlign: "right"
              },
              "& th:nth-of-type(3)": {
                textAlign: "center"
              }
            }}>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {[1, 2, 3].map(item => <TableRow key={item} sx={{
              "& td:last-of-type": {
                textAlign: "right"
              },
              "& td:nth-of-type(3)": {
                textAlign: "center"
              }
            }}>
                  <StyledTableCell>Nike airmax 270</StyledTableCell>
                  <StyledTableCell>$760</StyledTableCell>
                  <StyledTableCell>15</StyledTableCell>
                  <StyledTableCell>$850</StyledTableCell>
                </TableRow>)}
            </TableBody>
          </Table>

          <Box width={230} marginLeft="auto" paddingY={1.5}>
            <FlexBox justifyContent="space-between" mt={1}>
              <H6 fontWeight={500} color="text.disabled">
                Subtotal
              </H6>
              <H6 fontWeight={500} color="text.disabled">
                $428.00
              </H6>
            </FlexBox>

            <FlexBox justifyContent="space-between" mt={1}>
              <H6 fontWeight={500} color="text.disabled">
                Discount
              </H6>
              <H6 fontWeight={500} color="text.disabled">
                $428.00
              </H6>
            </FlexBox>

            <FlexBox justifyContent="space-between" mt={1}>
              <H6 fontWeight={500} color="text.disabled">
                VAT
              </H6>
              <H6 fontWeight={500} color="text.disabled">
                $428.00
              </H6>
            </FlexBox>

            <Divider sx={{
            paddingTop: 1,
            marginBottom: 1
          }} />

            <FlexBox justifyContent="space-between">
              <H6>Total</H6>
              <H6>$428.00</H6>
            </FlexBox>
          </Box>
        </Box>
      </Box>
    </ScrollBar>;
};

export default InvoiceTab;