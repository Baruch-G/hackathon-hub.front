import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import './AddHackathon.css';
import { ImageDropZone } from '../imgaeDropZone/ImageDropZone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AddHackathonProps {
  onSubmit: (post: { description: string, startDate: Date | null, endDate: Date | null, location: number | null }) => void;
}

const AddHackathon = (props: AddHackathonProps) => {
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ description?: string, startDate?: string, endDate?: string, location?: string }>({});

  const validatePost = () => {
    let isValid = true;
    const errors: { description?: string, startDate?: string, endDate?: string, location?: string } = {};

    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!startDate) {
      errors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!endDate) {
      errors.endDate = 'End date is required';
      isValid = false;
    } else if (startDate && endDate && startDate > endDate) {
      errors.endDate = 'End date should be after start date';
      isValid = false;
    }

    if (location === null || location <= 0) {
      errors.location = 'Location is required and should be a positive number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePost()) {
      props.onSubmit({ description, startDate, endDate, location });
      setDescription('');
      setStartDate(null);
      setEndDate(null);
      setLocation(null);
      setErrors({});
    }
  };

  return (
    <Box className="add-hackathon">
      <h2>Add Hackathon</h2>
      <Box component="form" onSubmit={handleSubmit} className="post-hackathon">
        <Box className="form-group">
          <TextField
            label="Write some details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={Boolean(errors.description)}
            helperText={errors.description}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Box className="form-group">
          <TextField
            label="Location"
            type="number"
            value={location !== null ? location : ''}
            onChange={(e) => setLocation(e.target.value ? parseInt(e.target.value) : null)}
            error={Boolean(errors.location)}
            helperText={errors.location}
            fullWidth
          />
        </Box>
        <Box className='form-group date-range-inputs'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                slotProps={{ textField: { error: Boolean(errors.startDate), helperText: errors.startDate } }}
              />
            </Box>
            <Box>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                slotProps={{ textField: { error: Boolean(errors.endDate), helperText: errors.endDate } }}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box className='form-group'>
          <ImageDropZone />
        </Box>
        <Button variant="contained" color="primary" type="submit" className="hac-btn" fullWidth>
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default AddHackathon;
