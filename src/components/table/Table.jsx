import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Student: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Bkash",
      status: "Approved",
    },
    {
      id: 2235235,
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      Student: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Roket",
      status: "Pending",
    },
    {
      id: 2342353,
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      Student: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Bkash",
      status: "Pending",
    },
    {
      id: 2357741,
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      Student: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      Student: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Bkash",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Profile</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.Student}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
