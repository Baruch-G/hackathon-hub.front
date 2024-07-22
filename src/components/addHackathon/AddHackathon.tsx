import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, ImageList, ImageListItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './AddHackathon.css';
import { ImageDropZone } from '../imgaeDropZone/ImageDropZone';
import { addHackathon, AddHackathonDto, fetchHackathon, updateHackathon } from '../../api/DataFetch';
import useUserStore from '../../state/UserStore';
import useHackathonStore from '../../state/HackathonStore';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useSnackbarStore from '../../state/SnackbarStore';
import { Hackathon } from '../hackathonList/HackathonList';

interface AddHackathonProps {
  updateMode?: boolean
}

const AddHackathon = (props: AddHackathonProps) => {
  const { opanStackbar } = useSnackbarStore(store => store);
  const { id } = useParams();
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [location, setLocation] = useState<string>('');
  const [errors, setErrors] = useState<{ description?: string, startDate?: string, endDate?: string, location?: string }>({});
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const user = useUserStore(store => store.user);
  const addHackathonsToState = useHackathonStore(store => store.addHackathon); // Modified here to use the new addOrUpdateHackathon method
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchHackathon(id).then((hackathon: Hackathon) => {
        setDescription(hackathon.description);
        setStartDate(dayjs(hackathon.startDate));
        setEndDate(dayjs(hackathon.endDate));
        setLocation(hackathon.location);
        setExistingImages(hackathon.imgs); // Set existing images
      }).catch((error: any) => {
        console.error(error);
        opanStackbar('Failed to fetch hackathon details', 'error');
      });
    }
  }, [id, opanStackbar]);

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
    } else if (startDate && endDate && startDate.isAfter(endDate)) {
      errors.endDate = 'End date should be after start date';
      isValid = false;
    }

    if (!location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleImageDrop = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) return;

    if (validatePost()) {
      try {
        let imageUrls: string[] = existingImages;

        if (files.length > 0) {
          const formData = new FormData();
          files.forEach((file) => {
            formData.append('file', file);
          });

          const uploadResponse = await axios.post('https://hackathon-hub-server.onrender.com/file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          imageUrls = uploadResponse.data.urls;
        }

        const hackathonData: AddHackathonDto = {
          creator: user._id,
          location: location,
          startDate: startDate?.toDate() || new Date(),
          endDate: endDate?.toDate() || new Date(),
          description,
          comments: [],
          imgs: [...imageUrls, ...existingImages],
          likes: [],
          dateCreated: new Date(),
        };

        let response;

        if (props.updateMode && id) {
          response = await updateHackathon(id, hackathonData);
        } else {
          response = await addHackathon(hackathonData);
        }

        const newHackathon: Hackathon = response.data;
        addHackathonsToState(newHackathon);

        setDescription('');
        setStartDate(null);
        setEndDate(null);
        setLocation('');
        setFiles([]);
        setErrors({});
        opanStackbar(`Hackathon ${props.updateMode ? 'updated' : 'added'} successfully`, 'success');
        navigate('/hackathon/view');
      } catch (error) {
        console.error(error);
        opanStackbar(`Failed to ${props.updateMode ? 'update' : 'add'} hackathon`, 'error');
      }
    }
  };

  return (
    <Box className="add-hackathon">
      <h2>{id ? 'Update Hackathon' : 'Add Hackathon'}</h2>
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
            value={location !== null ? location : ''}
            onChange={(e) => setLocation(e.target.value)}
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
                onChange={(date) => setStartDate(date)}
                slotProps={{ textField: { error: Boolean(errors.startDate), helperText: errors.startDate } }}
              />
            </Box>
            <Box>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                slotProps={{ textField: { error: Boolean(errors.endDate), helperText: errors.endDate } }}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box className='form-group'>
          <ImageDropZone onDrop={handleImageDrop} />
          {existingImages.length > 0 && (
            <Box>
              <h3>Existing Images</h3>
              <Box className="existing-images">

                <ImageList sx={{ height: 250 }} cols={3} rowHeight={164}>
                  {existingImages.map((img, idx) => (
                    <ImageListItem key={idx}>
                      <img
                        srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${img}?w=164&h=164&fit=crop&auto=format`}
                        alt={img}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Box>
          )}
        </Box>
        <Button variant="contained" color="primary" type="submit" className="hac-btn" fullWidth>
          {id ? 'Update' : 'Post'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddHackathon;
