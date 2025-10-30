import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import VacationForm from "../components/VacationForm";
import VacationTable from "../components/VacationTable";
import VacationCalendar from "../components/VacationCalendar";

import { getVacationsByUser, getApprovedVacations } from "../api/vacationsApi";

export default function RequesterPage() {
  const [userVacations, setUserVacations] = useState([]);
  const [allApproved, setAllApproved] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchVacations = async () => {
    try {
      const userRes = await getVacationsByUser(user.id);
      const approvedRes = await getApprovedVacations();
      setUserVacations(userRes);
      setAllApproved(approvedRes);
    } catch (err) {
      console.error(err);
    } 
  };

  useEffect(() => {
    fetchVacations();
  }, [user.id]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Welcome, {user.name}</Typography>
        <Button variant="contained" onClick={handleDialogOpen}>New Request</Button>
      </Paper>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="My Requests" />
        <Tab label="Vacation Calendar" />
      </Tabs>

      <Box hidden={tabValue !== 0}>
        <VacationTable vacations={userVacations} showActions={false} />
      </Box>

      <Box hidden={tabValue !== 1}>
        <VacationCalendar vacations={allApproved} showAll={true} />
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>New Vacation Request</DialogTitle>
        <DialogContent>
          <VacationForm onClose={handleDialogClose} refreshVacations={fetchVacations} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
