import { styled } from '@mui/system'

export const CenteredColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > :not(:last-child)': {
    marginBottom: 20,
  },
})
