'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCallback } from 'react';
import { mapService } from '@/service';
import { TMap } from 'tlbs-map-react';
// 腾讯地图api key
const TENCENT_MAPS_KEY = 'LBABZ-OKPKQ-MZI5Y-BW6ZS-VIIMV-CFFLP';

interface MapPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string; title:string }) => void;
  defaultLocation?: { lat: number; lng: number };
}

interface SearchResult {
  title: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export function MapPicker({ onLocationSelect, defaultLocation }: MapPickerProps): React.JSX.Element {
  const [map, setMap] = React.useState<any>(null);
  const [marker, setMarker] = React.useState<any>(null);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleMapLoad = (mapInstance: any) => {
    setMap(mapInstance);
  };

  const handleSearch = useCallback(async (value: string) => {
    if (!value || value.length < 2) {
      setSearchResults([]);
      return;
    }

      const response = await mapService.search(value);
      if (response.data && response.data.length > 0) {
        const results = response.data.map((item: any) => ({
          title: item.title,
          address: item.address,
          location: {
            lat: item.location.lat,
            lng: item.location.lng
          }
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
   
  }, []);

  const handleChange = useCallback((event:React.SyntheticEvent,value: string | SearchResult | null)  => {
    if(typeof value !== 'string' && value){
      const { lat, lng }  = value.location
      onLocationSelect({ lat, lng, address: value.address, title:value.title })
    }
  },[onLocationSelect]);

  



  return (
    <Box>
      <Autocomplete
        freeSolo
        options={searchResults}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : `${option.title} - ${option.address}`
        }
        value={searchValue}
        onChange={(event,value)=>handleChange(event,value)}
        onInputChange={(_, newInputValue) => {
          setSearchValue(newInputValue);
          handleSearch(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="搜索社区名称"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.title}>
            <Box>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {option.title}
              </Box>
              <Box component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                {option.address}
              </Box>
            </Box>
          </li>
        )}
      />
    </Box>
  );
} 