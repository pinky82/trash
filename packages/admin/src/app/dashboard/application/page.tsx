'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { applicationService, Application, ApplicationQuery } from '@/service/application';
import { ApplicationStatus } from '@trash/types';

const ITEMS_PER_PAGE = 10;

export default function ApplicationPage(): React.JSX.Element {
  const [applications, setApplications] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(ITEMS_PER_PAGE);
  const [status, setStatus] = useState<ApplicationQuery['status'] | ''>('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationService.getApplications({
        page,
        pageSize,
        status: status || undefined,
      });
      setApplications(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  const handleAction = (application: Application, type: 'approve' | 'reject') => {
    setSelectedApplication(application);
    setActionType(type);
    setDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedApplication || !actionType) return;

    try {
      if (actionType === 'approve') {
        await applicationService.approveApplication(selectedApplication.id);
      } else {
        await applicationService.rejectApplication(selectedApplication.id);
      }
      setDialogOpen(false);
      fetchApplications();
    } catch (error) {
      console.error(`Failed to ${actionType} application:`, error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, status]);

  const getStatusText = (status: Application['status']) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return '待处理';
      case ApplicationStatus.APPROVED:
        return '已通过';
      case ApplicationStatus.REJECTED:
        return '已拒绝';
      default:
        return '未知';
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return 'warning.main';
      case ApplicationStatus.APPROVED:
        return 'success.main';
      case ApplicationStatus.REJECTED:
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        申请记录
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>状态</InputLabel>
          <Select
            value={status}
            label="状态"
            onChange={handleStatusChange}
          >
            <MenuItem value={ApplicationStatus.NONE}>全部</MenuItem>
            <MenuItem value={ApplicationStatus.PENDING}>待处理</MenuItem>
            <MenuItem value={ApplicationStatus.APPROVED}>已通过</MenuItem>
            <MenuItem value={ApplicationStatus.REJECTED}>已拒绝</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 2,
          borderRadius: 2,
          mb: 3,
          '& .MuiTableCell-root': {
            py: 2,
            px: 3,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>申请人</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>手机号</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>身份证号</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>状态</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>申请时间</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: 120, textAlign: 'center' }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow 
                key={application.id}
                sx={{ 
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.phone}</TableCell>
                <TableCell>{application.idCard}</TableCell>
                <TableCell>
                  <Typography color={getStatusColor(application.status)}>
                    {getStatusText(application.status)}
                  </Typography>
                </TableCell>
                <TableCell>{new Date(application.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {application.status === ApplicationStatus.PENDING && (
                    <Box display="flex" gap={1}>
                      <Tooltip title="通过">
                        <IconButton 
                          color="success"   
                          onClick={() => handleAction(application, 'approve')}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="拒绝">
                        <IconButton 
                          color="error"
                          onClick={() => handleAction(application, 'reject')}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack alignItems="center">
        <Pagination 
          count={Math.ceil(total / pageSize)} 
          page={page} 
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="action-dialog-title"
        aria-describedby="action-dialog-description"
      >
        <DialogTitle id="action-dialog-title">
          {actionType === 'approve' ? '确认通过申请' : '确认拒绝申请'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="action-dialog-description">
            您确定要{actionType === 'approve' ? '通过' : '拒绝'}该申请吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>取消</Button>
          <Button 
            onClick={handleConfirmAction} 
            color={actionType === 'approve' ? 'success' : 'error'} 
            variant="contained"
          >
            {actionType === 'approve' ? '通过' : '拒绝'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
