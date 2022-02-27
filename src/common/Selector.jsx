import React from 'react'
import { styled } from '@mui/system'
import { Autocomplete, TextField, MenuItem } from '@mui/material'

import { useStrings } from '../strings/context'

export const Selector = ({ onChange, options, placeholder, label, optionsLabel, onBlur }) => {
  const strings = useStrings()
  return (
    <Autocomplete
      onChange={(event, option) => {
        onChange(option)
      }}
      options={options}
      sx={{ width: 180 }}
      getOptionLabel={(option) => option[optionsLabel]}
      renderInput={(params) => <TextField autoFocus size="small" {...params} label={label} placeholder={placeholder} />}
      renderOption={(props, option) => {
        return <Option {...props}>{option[optionsLabel]}</Option>
      }}
      noOptionsText={strings.noOption}
      size="small"
      openOnFocus
      disablePortal
      clearOnBlur
      autoHighlight
      onBlur={onBlur}
    />
  )
}

const Option = styled(MenuItem)({})
