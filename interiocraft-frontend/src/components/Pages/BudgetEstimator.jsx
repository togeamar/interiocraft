import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Stack,
} from "@mui/material";

const PACKAGE_RATES = {
  basic: 1200,
  standard: 1600,
  premium: 2200,
};

const INITIAL_FORM = {
  bhk: "2",
  carpetArea: "",
  packageType: "standard",
  modularKitchen: true,
  wardrobes: true,
  falseCeiling: false,
  painting: true,
};

function formatCurrency(value) {
  if (!value || isNaN(value)) return "-";
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

function calculateEstimate(form) {
  const area = Number(form.carpetArea) || 0;
  const bhk = Number(form.bhk) || 0;
  const baseRate = PACKAGE_RATES[form.packageType] || 0;

  const baseCost = area * baseRate;

  const extras = [];
  let extrasTotal = 0;

  if (form.modularKitchen) {
    const cost = 60000;
    extras.push({ label: "Modular kitchen", cost });
    extrasTotal += cost;
  }

  if (form.wardrobes) {
    const cost = bhk * 25000;
    extras.push({ label: "Wardrobes", cost });
    extrasTotal += cost;
  }

  if (form.falseCeiling) {
    const cost = area * 120;
    extras.push({ label: "False ceiling", cost });
    extrasTotal += cost;
  }

  if (form.painting) {
    const cost = area * 50;
    extras.push({ label: "Painting", cost });
    extrasTotal += cost;
  }

  const total = baseCost + extrasTotal;

  return {
    area,
    bhk,
    baseRate,
    baseCost,
    extras,
    extrasTotal,
    total,
    costPerSqFt: area > 0 ? total / area : 0,
  };
}

export default function BudgetEstimator() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [estimate, setEstimate] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = calculateEstimate(form);
    setEstimate(result);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setEstimate(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f7",
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      <Box maxWidth="lg" sx={{ mx: "auto" }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Interior Budget Estimator
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Get a quick rough estimate for your home interiors. Final cost will
          depend on detailed design and site conditions.
        </Typography>

        <Grid container spacing={3}>
          {/* LEFT: Form */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {/* BHK */}
                    <FormControl fullWidth size="small">
                      <InputLabel id="bhk-label">BHK Type</InputLabel>
                      <Select
                        labelId="bhk-label"
                        label="BHK Type"
                        name="bhk"
                        value={form.bhk}
                        onChange={handleChange}
                      >
                        <MenuItem value="1">1 BHK</MenuItem>
                        <MenuItem value="2">2 BHK</MenuItem>
                        <MenuItem value="3">3 BHK</MenuItem>
                        <MenuItem value="4">4 BHK</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Carpet area */}
                    <TextField
                      fullWidth
                      size="small"
                      label="Carpet area (sq. ft.)"
                      type="number"
                      name="carpetArea"
                      value={form.carpetArea}
                      onChange={handleChange}
                      placeholder="e.g. 900"
                      inputProps={{ min: 0 }}
                      required
                    />

                    {/* Package type */}
                    <FormControl component="fieldset">
                      <FormLabel component="legend" sx={{ mb: 1 }}>
                        Package type
                      </FormLabel>
                      <RadioGroup
                        row
                        name="packageType"
                        value={form.packageType}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="basic"
                          control={<Radio size="small" sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }} />}
                          label="Basic"
                        />
                        <FormControlLabel
                          value="standard"
                          control={<Radio size="small" sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }} />}
                          label="Standard"
                        />
                        <FormControlLabel
                          value="premium"
                          control={<Radio size="small" sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }} />}
                          label="Premium"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* Add-ons */}
                    <Box>
                      <FormLabel component="legend" sx={{ mb: 1 }}>
                        Add-ons
                      </FormLabel>
                      <Stack spacing={0.5}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="modularKitchen"
                              checked={form.modularKitchen}
                              onChange={handleCheckboxChange}
                              sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }}
                            />
                          }
                          label="Modular kitchen"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="wardrobes"
                              checked={form.wardrobes}
                              onChange={handleCheckboxChange}
                              sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }}
                            />
                          }
                          label="Wardrobes for all bedrooms"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="falseCeiling"
                              checked={form.falseCeiling}
                              onChange={handleCheckboxChange}
                              sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }}
                            />
                          }
                          label="False ceiling"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              name="painting"
                              checked={form.painting}
                              onChange={handleCheckboxChange}
                              sx={{ color: "var(--primary-color)", "&.Mui-checked": { color: "var(--primary-color)" } }}
                            />
                          }
                          label="Complete painting"
                        />
                      </Stack>
                    </Box>

                    {/* Buttons */}
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained" type="submit" disableElevation sx={{ bgcolor: "var(--primary-color)", "&:hover": { bgcolor: "var(--secondary-color)" } }}>
                        Calculate estimate
                      </Button>
                      <Button variant="outlined" onClick={handleReset} sx={{ borderColor: "var(--primary-color)", color: "var(--primary-color)", "&:hover": { borderColor: "var(--secondary-color)", bgcolor: "var(--primary-hover)" } }}>
                        Reset
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT: Result */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                bgcolor: "var(--primary-color)",
                color: "var(--light-text)",
                height: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Estimated Interior Cost
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 3 }}
                  color="rgba(249,250,251,0.7)"
                >
                  This is an approximate estimate based on your inputs. The
                  actual quotation may vary after site visit and detailed
                  design.
                </Typography>

                {estimate ? (
                  <>
                    {/* Total */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="body2"
                        color="rgba(249,250,251,0.7)"
                      >
                        Approx. total
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {formatCurrency(estimate.total)}
                      </Typography>
                      {estimate.costPerSqFt > 0 && (
                        <Typography
                          variant="caption"
                          color="rgba(249,250,251,0.7)"
                        >
                          ~{formatCurrency(estimate.costPerSqFt)} per sq. ft.
                        </Typography>
                      )}
                    </Box>

                    {/* Project details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Project details
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="rgba(249,250,251,0.7)"
                      >
                        BHK: {estimate.bhk} BHK
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="rgba(249,250,251,0.7)"
                      >
                        Carpet area: {estimate.area} sq. ft.
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="rgba(249,250,251,0.7)"
                      >
                        Package:{" "}
                        {form.packageType.charAt(0).toUpperCase() +
                          form.packageType.slice(1)}{" "}
                        ({formatCurrency(estimate.baseRate)}/sq. ft.)
                      </Typography>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(55,65,81,0.8)", mb: 2 }} />

                    {/* Cost breakup */}
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Cost breakup
                      </Typography>
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="caption"
                            color="rgba(249,250,251,0.7)"
                          >
                            Base interiors
                          </Typography>
                          <Typography
                            variant="caption"
                            color="rgba(249,250,251,0.9)"
                          >
                            {formatCurrency(estimate.baseCost)}
                          </Typography>
                        </Stack>

                        {estimate.extras.map((item) => (
                          <Stack
                            key={item.label}
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Typography
                              variant="caption"
                              color="rgba(249,250,251,0.7)"
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="rgba(249,250,251,0.9)"
                            >
                              {formatCurrency(item.cost)}
                            </Typography>
                          </Stack>
                        ))}

                        <Divider
                          sx={{
                            borderColor: "rgba(55,65,81,0.9)",
                            my: 1,
                          }}
                        />
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="caption" fontWeight={600}>
                            Total
                          </Typography>
                          <Typography variant="caption" fontWeight={600}>
                            {formatCurrency(estimate.total)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Typography
                    variant="body2"
                    color="rgba(249,250,251,0.75)"
                    sx={{ mt: 2 }}
                  >
                    Enter your BHK type, carpet area, package and add-ons on the
                    left, then click <b>"Calculate estimate"</b> to view the
                    budget here.
                  </Typography>
                )}
              </CardContent>


            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
