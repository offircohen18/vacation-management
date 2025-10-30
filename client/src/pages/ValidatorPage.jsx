import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import UsersTab from "../components/UsersTab";
import VacationTable from "../components/VacationTable";
import VacationCalendar from "../components/VacationCalendar";
import VacationStatusDialog from "../components/VacationStatusDialog";

import { fetchVacations, updateVacationStatus } from "../api/vacationsApi";

export default function ValidatorPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [vacations, setVacations] = useState([]);
  const [vacationsLoading, setVacationsLoading] = useState(true);
  const [statusDialog, setStatusDialog] = useState({ open: false, vacation: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [statusFilter, setStatusFilter] = useState("");

  const fetchVacationsData = async (status = "") => {
    try {
      setVacationsLoading(true);
      const res = await fetchVacations(status);
      setVacations(res);
    } catch (err) {
      console.error(err);
    } finally {
      setVacationsLoading(false);
    }
  };

  useEffect(() => {
    fetchVacationsData(statusFilter);
  }, [statusFilter]);

  const handleChangeTab = (event, newValue) => setTabIndex(newValue);
  const openStatusDialog = (vacation) => setStatusDialog({ open: true, vacation });
  const closeStatusDialog = () => setStatusDialog({ open: false, vacation: null });

  const handleUpdateVacationStatus = async (id, status, comment) => {
    try {
      await updateVacationStatus(id, status, comment);
      setSnackbar({ open: true, message: "Vacation status updated", severity: "success" });
      closeStatusDialog();
      fetchVacations(statusFilter); 
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update status", severity: "error" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Validator Dashboard
        </Typography>

        <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="validator tabs">
          <Tab label="Vacation Management" />
          <Tab label="Users Management" />
          <Tab label="Calendar" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && (
          <>
            <FormControl sx={{ mb: 2, minWidth: 200 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            <VacationTable
              vacations={vacations}
              loading={vacationsLoading}
              onChangeStatus={openStatusDialog}
              showActions
            />
          </>
        )}

        {tabIndex === 1 && <UsersTab setSnackbar={setSnackbar} />}
        {tabIndex === 2 && <VacationCalendar vacations={vacations} showAll />}
      </Box>

      <VacationStatusDialog
        open={statusDialog.open}
        vacation={statusDialog.vacation}
        onClose={closeStatusDialog}
        onSubmit={handleUpdateVacationStatus}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
