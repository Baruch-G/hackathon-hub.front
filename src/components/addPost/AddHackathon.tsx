import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddHackathon.css';
import { ImageDropZone } from '../imgaeDropZone/ImageDropZone';

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
    <div className="add-hackathon">
      <h2>Add Hackathon</h2>
      <form onSubmit={handleSubmit} className="post-hackathon">
        <div className="form-group">
          <label>Write some details:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="number"
            value={location !== null ? location : ''}
            onChange={(e) => setLocation(e.target.value ? parseInt(e.target.value) : null)}
            className={errors.location ? 'error' : ''}
            placeholder="Enter location"
          />
          {errors.location && <p className="error-text">{errors.location}</p>}
        </div>
        <div className='form-group date-range-inputs'>
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className={errors.startDate ? 'error' : ''}
              placeholderText="Select start date"
            />
            {errors.startDate && <p className="error-text">{errors.startDate}</p>}
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className={errors.endDate ? 'error' : ''}
              placeholderText="Select end date"
            />
            {errors.endDate && <p className="error-text">{errors.endDate}</p>}
          </div>
        </div>
        <div className='form-group'>
          <ImageDropZone />
        </div>
        <button className='hac-btn' type="submit">Post</button>
      </form>
    </div>
  );
};

export default AddHackathon;
