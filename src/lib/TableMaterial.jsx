import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableMaterial = ({ data = [], handleSelectedRow }) => {

    return (
        <TableContainer component={Paper} style={{ height: 420 }}>
            <Table aria-label="table material">
                <TableHead className="bg-[#e0f6ff]">
                    <TableRow>
                        <TableCell>Material Name</TableCell>
                        <TableCell>Available Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.material.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => handleSelectedRow(row)}
                        >
                            <TableCell component="th" scope="row">
                                {row.material.name}
                            </TableCell>
                            <TableCell align="right">{row.available_stock}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMaterial;