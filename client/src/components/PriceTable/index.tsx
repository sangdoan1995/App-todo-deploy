import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {API_BASE_URL} from "constants/constants";
import axiosInstance from "../../apis";
type PriceType = {
  _id: string,
  date: string,
  last_price: string,
  opening_price: string,
  highest_price: string,
  lowest_price: string,
  volume: string,
  change_percent: string,
}
export default function PriceTable() {
  const [prices, setPrices] = useState<PriceType[]>([])
  useEffect(() => {
    const fetchPrices = async () => {
      const {data} = await axiosInstance.get(`${API_BASE_URL}/api/prices`);
      setPrices(data?.data)
    }
    fetchPrices()
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ngày</TableCell>
            <TableCell>Lần cuối</TableCell>
            <TableCell>Mở</TableCell>
            <TableCell>Cao</TableCell>
            <TableCell>Thấp</TableCell>
            <TableCell>KL</TableCell>
            <TableCell>% Thay Đổi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((row) => (
            <TableRow
              key={row._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">{row.date}</TableCell>
              <TableCell>{row.last_price}</TableCell>
              <TableCell>{row.opening_price}</TableCell>
              <TableCell>{row.highest_price}</TableCell>
              <TableCell>{row.lowest_price}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.change_percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}