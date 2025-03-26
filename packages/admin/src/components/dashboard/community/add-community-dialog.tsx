'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { MapPicker } from './map-picker';
import { communityService } from '@/service';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {  useForm } from 'react-hook-form';
interface AddCommunityDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  thumbnail: string;
}


const validationSchema = Yup.object().shape({
  name: Yup.string().required('请输入社区名称'),
  address: Yup.string().required('请输入社区地址'),
  latitude: Yup.number().required('请输入社区纬度'),
  longitude: Yup.number().required('请输入社区经度'),
  thumbnail: Yup.string()
});

export function AddCommunityDialog({ open, onClose, onSuccess }: AddCommunityDialogProps): React.JSX.Element {

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      thumbnail: '',
    },
    onSubmit: async () => { },
    validationSchema,
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = useCallback(async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      // mui弹窗提示错误 

    }
    setLoading(true);
    await communityService.createCommunity(formik.values).finally(() => {
      setLoading(false);
    });
    onSuccess();
    onClose();
  }, [formik, onSuccess, onClose]);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number; address: string; title: string }) => {
    formik.setValues(prev => ({
      ...prev,
      address: location.address,
      latitude: location.lat,
      longitude: location.lng,
      name: location.title,
    }));
  }, [formik]);

  const handleChange = useCallback((name: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    formik.setFieldValue(name, value);
  }, [formik]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>添加社区</DialogTitle>
      <DialogContent>
        <Stack spacing={3} style={{ paddingTop: 10 }}>
          <MapPicker onLocationSelect={handleLocationSelect} />
          <Stack spacing={3} direction="row" >
            <TextField
              label="社区名称"
              type="text"
              fullWidth
              value={formik.values.name}
              onChange={(e) => handleChange('name', e)}
            />
            <TextField
              label="社区地址"
              type="text"
              fullWidth
              value={formik.values.address}
              onChange={(e) => handleChange('address', e)}
            />
          </Stack>
          <Stack spacing={3} direction="row" >
            <TextField
              label="latitude"
              type="number"
              fullWidth
              value={formik.values.latitude}
              onChange={(e) => handleChange('latitude', e)}
            />
            <TextField
              label="longitude"
              type="number"
              fullWidth
              value={formik.values.longitude}
              onChange={(e) => handleChange('longitude', e)}
            />
          </Stack>

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !formik.values.name || !formik.values.address || !formik.values.latitude || !formik.values.longitude}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
} 