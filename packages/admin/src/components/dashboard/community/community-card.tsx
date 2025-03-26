import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Community } from '@/types/community';

interface CommunityCardProps {
  community: Community;
  onClick?: () => void;
}

export function CommunityCard({ community, onClick }: CommunityCardProps): React.JSX.Element {
  return (
    <Card 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: 3,
        } : {},
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={community.image || '/images/community-placeholder.jpg'}
        alt={community.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {community.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {community.address}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            丢手: {community.collectorCount || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            订单: {community.orderCount || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 