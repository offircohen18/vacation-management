import { useState, useEffect } from "react";
import { Container, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../api/usersApi";

export default function UsersTab({setSnackbar}) {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setEditingUser(null);
    setOpenUserDialog(true);
  };

  const handleEditUser = async (id) => {
    try {
      const user = await getUserById(id);
      setEditingUser(user);
      setOpenUserDialog(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setSnackbar({ open: true, message: "User deleted", severity: "info" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
    }
  };

  const handleSubmitUser = async (data) => {
    try {
      if (editingUser) await updateUser(editingUser.id, data);
      else await createUser(data);
      setSnackbar({ open: true, message: editingUser ? "User updated" : "User created", severity: "success" });
      setOpenUserDialog(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save user", severity: "error" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleCreateUser}>
             Add User
        </Button>
        <UsersTable
            users={users}
            loading={usersLoading}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
        />

        <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} fullWidth maxWidth="sm">
            <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
            <DialogContent>
                <UserForm
                    initialData={editingUser}
                    onSubmit={handleSubmitUser}
                    onCancel={() => setOpenUserDialog(false)}
                />
            </DialogContent>
        </Dialog>
    </Container>
  );
}
