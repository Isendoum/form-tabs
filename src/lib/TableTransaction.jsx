import { Button, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TableTransaction = ({ data = [], handleDeleteRow, schema }) => {
   return (
      <TableContainer component={Paper}>
         <Table aria-label="table material">
            <TableHead className="bg-[#e0f6ff]">
               <TableRow>
                  {schema.map((column, index) => (
                     <TableCell key={index}>{column.header}</TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((row, i) => (
                  <TableRow
                     key={row.material.code}
                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     {schema.map((column, index) => {
                        if (column.type === "action") {
                           return (
                              <TableCell key={index}>
                                 <Button>Action</Button>
                              </TableCell>
                           );
                        } else {
                           if (column.key.includes(".")) {
                              const splittedKey = column.key.split(".");

                              return (
                                 <TableCell key={index}>
                                    {row[splittedKey[0]][splittedKey[1]]}
                                 </TableCell>
                              );
                           }
                           return (
                              <TableCell key={index}>
                                 {row[column.key]}
                              </TableCell>
                           );
                        }
                     })}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
};

export default TableTransaction;
