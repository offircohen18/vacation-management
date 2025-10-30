import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Requester");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.role);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <TextField
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          select
          SelectProps={{ native: true }}
        >
          <option value="Requester">Requester</option>
          <option value="Validator">Validator</option>
        </TextField>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">{initialData ? "Update" : "Create"}</Button>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
}
