import MuiPaper from '@mui/material/Paper'
import { styled } from '@mui/system'

export const Paper = styled(MuiPaper)(({ withPadding }) => ({
  padding: withPadding ? 20 : 0,
  boxSizing: 'border-box',
  marginBottom: 10,
}))
