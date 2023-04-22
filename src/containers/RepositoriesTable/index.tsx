import { FC, memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';

const RepositoryTable: FC = memo(({ data }) => {
  // { id, name, value, link }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: '100%', overflowX: 'auto' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Repo Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Stars</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <a href={row.link} target="_blank">
                  {row.name}
                </a>
              </TableCell>
              <TableCell align="right">{row.Description}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default RepositoryTable;
