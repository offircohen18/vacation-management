import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  TablePagination,
} from "@mui/material";

import StatusChip from "./StatusChip";

export default function VacationTable({
  vacations,
  loading = false,
  showActions = false,
  onChangeStatus,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  const paginatedVacations = vacations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to first
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Validator Comments</TableCell>
            {showActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedVacations.map((vacation) => (
            <TableRow key={vacation.id}>
              <TableCell>{vacation.user_name || vacation.user_id}</TableCell>
              <TableCell>{vacation.start_date}</TableCell>
              <TableCell>{vacation.end_date}</TableCell>
              <TableCell>{vacation.reason}</TableCell>
              <TableCell>
                <StatusChip status={vacation.status} />
              </TableCell>
              <TableCell>{vacation.comments || ''}</TableCell>
              {showActions && (
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onChangeStatus(vacation)}
                  >
                    Change Status
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={vacations.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
