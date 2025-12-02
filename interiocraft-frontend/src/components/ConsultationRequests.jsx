import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  city: "",
  propertyType: "",
  bhk: "",
  budgetRange: "",
  message: "",
};

export default function ConsultationRequests() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [requests, setRequests] = useState([]); // local list for demo
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.city || !form.propertyType) {
      alert("Please fill the required fields (Name, Phone, City, Property Type).");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toLocaleString("en-IN"),
      status: "Pending",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setForm(INITIAL_FORM);
    setSuccessOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSuccessOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f7",
        py: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      <Box maxWidth="lg" sx={{ mx: "auto" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Consultation Request
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Share a few details about your home. Our interior design team will review your
          requirements and get back to you with a personalised consultation.
        </Typography>

        <Grid container spacing={3}>
          {/* LEFT: FORM */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tell us about your space
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      required
                      label="Full name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Phone number"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="City"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" required>
                          <InputLabel id="property-type-label">Property type</InputLabel>
                          <Select
                            labelId="property-type-label"
                            label="Property type"
                            name="propertyType"
                            value={form.propertyType}
                            onChange={handleChange}
                          >
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="Independent house">Independent house</MenuItem>
                            <MenuItem value="Villa">Villa</MenuItem>
                            <MenuItem value="Office">Office / Commercial</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="bhk-label">BHK</InputLabel>
                          <Select
                            labelId="bhk-label"
                            label="BHK"
                            name="bhk"
                            value={form.bhk}
                            onChange={handleChange}
                          >
                            <MenuItem value="1 BHK">1 BHK</MenuItem>
                            <MenuItem value="2 BHK">2 BHK</MenuItem>
                            <MenuItem value="3 BHK">3 BHK</MenuItem>
                            <MenuItem value="4+ BHK">4+ BHK</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="budget-range-label">Budget range</InputLabel>
                          <Select
                            labelId="budget-range-label"
                            label="Budget range"
                            name="budgetRange"
                            value={form.budgetRange}
                            onChange={handleChange}
                          >
                            <MenuItem value="Below 3L">Below ₹3 Lakhs</MenuItem>
                            <MenuItem value="3L - 7L">₹3L – ₹7 Lakhs</MenuItem>
                            <MenuItem value="7L - 15L">₹7L – ₹15 Lakhs</MenuItem>
                            <MenuItem value="15L+">Above ₹15 Lakhs</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <TextField
                      label="Anything specific you have in mind? (optional)"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                    />

                    <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                      <Button variant="contained" type="submit">
                        Submit request
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setForm(INITIAL_FORM)}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT: LIST OF REQUESTS (demo only) */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Recent requests (demo)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Currently these requests are stored only in the browser for demo purposes.
              Later the backend team can connect this to a Spring Boot API and database.
            </Typography>

            {requests.length === 0 ? (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderStyle: "dashed",
                  color: "text.secondary",
                  fontSize: 14,
                }}
              >
                No consultation requests yet. Fill the form on the left to create one.
              </Paper>
            ) : (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Property</TableCell>
                      <TableCell>BHK</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created at</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell>{req.name}</TableCell>
                        <TableCell>{req.city}</TableCell>
                        <TableCell>{req.propertyType}</TableCell>
                        <TableCell>{req.bhk || "-"}</TableCell>
                        <TableCell>{req.status}</TableCell>
                        <TableCell>{req.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Consultation request submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
}
