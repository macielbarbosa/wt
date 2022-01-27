import { styled } from '@mui/system'

export const CenteredRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > :not(:last-child)': {
    marginRight: 5,
  },
})
