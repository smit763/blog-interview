import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../../helpers/Axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        // Optional: Auto login after register
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");

        // Redirect to login
        // navigate("/login");
      }

    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create an Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>

            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, height: 45 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>

          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
