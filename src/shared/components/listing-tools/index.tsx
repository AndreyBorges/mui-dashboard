import { FC } from 'react'
import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

import { IListingToolsProps } from '../'
import { Environment } from 'shared/environment'

const ListingTools: FC<IListingToolsProps> = ({
  searchText = '',
  showSearchInput = false,
  changeInSearchText,
  newButtonText = 'Novo',
  showNewButton = true,
  clickingOnNew
}) => {
  const theme = useTheme()
  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      paddingX={2}
      padding={1}
      display='flex'
      alignItems='center'
      gap={1}
    >
      {showSearchInput && (
        <TextField
          size='small'
          placeholder={Environment.SEARCH_INPUT}
          value={searchText}
          onChange={e => changeInSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display='flex' justifyContent='flex-end'>
        {showNewButton && (
          <Button
            variant='contained'
            color='primary'
            disableElevation
            startIcon={<Icon>add</Icon>}
            onClick={clickingOnNew}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default ListingTools
