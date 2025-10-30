import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Alert,
} from "@mui/material";

import { createVacation } from "../api/vacationsApi";

export default function VacationForm({ onClose, refreshVacations }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return setError("Start and End dates are required.");
    if (new Date(endDate) < new Date(startDate)) return setError("End date cannot be before Start date.");

    setLoading(true);
    setError("");

    try {
      await createVacation({
        userId: user.id,
        startDate: startDate,
        endDate: endDate,
        reason,
      });
      refreshVacations(); 
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create vacation request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Reason (optional)"
          multiline
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </Stack>
    </Box>
  );
}
