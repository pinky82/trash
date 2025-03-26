'use client';

import * as React from 'react';
import { 
  Box, 
  Button, 
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCommunityDialog } from '@/components/dashboard/community/add-community-dialog';
import { communityService } from '@/service';

interface Community {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export default function CommunityPage(): React.JSX.Element {
  const [communities, setCommunities] = React.useState<Community[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedCommunity, setSelectedCommunity] = React.useState<Community | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchCommunities = React.useCallback(async () => {

      setLoading(true);
      const response = await communityService.getCommunities().finally(()=> setLoading(false));
      setCommunities(response);
  }, [setCommunities, setLoading]);

  const handleDelete = React.useCallback(async () => {
    if (!selectedCommunity) return;
      await communityService.deleteCommunity(selectedCommunity.id).finally(()=> setLoading(false));
      await fetchCommunities();
      setOpenDeleteDialog(false);
      setSelectedCommunity(null);
  }, [selectedCommunity, setOpenDeleteDialog, setSelectedCommunity, fetchCommunities]);

  React.useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>社区管理</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
        >
          添加社区
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 2,
          borderRadius: 2,
          '& .MuiTableCell-root': {
            py: 2,
            px: 3,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>社区名称</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>地址</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>纬度</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>经度</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: 100 }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communities.map((community) => (
              <TableRow 
                key={community.id}
                sx={{ 
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                <TableCell>{community.name}</TableCell>
                <TableCell>{community.address}</TableCell>
                <TableCell>{community.latitude}</TableCell>
                <TableCell>{community.longitude}</TableCell>
                <TableCell>
                  <Tooltip title="删除">
                    <IconButton 
                      color="error"
                      onClick={() => {
                        setSelectedCommunity(community);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCommunityDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={fetchCommunities}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          确认删除
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            确定要删除社区 "{selectedCommunity?.name}" 吗？此操作不可撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>取消</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function fetchCommunities() {
  throw new Error('Function not implemented.');
}

