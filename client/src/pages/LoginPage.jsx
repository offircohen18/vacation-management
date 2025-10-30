import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  MenuItem,
  Paper,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";

import { getUsers } from "../api/usersApi";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUser = users.find((u) => u.id === Number(userId));
    if (!selectedUser) return alert("Please select a valid user.");
    localStorage.setItem("user", JSON.stringify(selectedUser));
    if (selectedUser.role === "Validator") navigate("/validator");
    else navigate("/requester");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Vacation Manager Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TextField
                select
                label="Select User"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                required
                sx={{ width: 300 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, width: 300 }}
              disabled={loading || !userId}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
