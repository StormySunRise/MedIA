import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { Symptom } from '../models/types';

interface SymptomSelectorProps {
  symptoms: Symptom[];
  selectedSymptoms: Symptom[];
  onSelect: (symptoms: Symptom[]) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ 
  symptoms, 
  selectedSymptoms, 
  onSelect 
}) => {
  return (
    <Autocomplete
      multiple
      options={symptoms}
      getOptionLabel={(option) => option.name}
      value={selectedSymptoms}
      onChange={(_, newValue) => onSelect(newValue)}
      renderInput={(params) => (
        <TextField {...params} label="Selecciona síntomas" placeholder="Síntomas" />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            label={option.name}
            size="small"
          />
        ))
      }
    />
  );
};

export default SymptomSelector;