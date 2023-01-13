import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from '@mui/material'
import { FC } from 'react'
import { IDetailToolsProps } from '../'

const DetailTools: FC<IDetailToolsProps> = ({
  textNew = 'Novo',
  showNewButton = true,
  showReturnButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,

  showNewButtonLoading = false,
  showReturnButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndCloseButtonLoading = false,

  onClickNew,
  onClickReturn,
  onClickDelete,
  onClickSave,
  onClickSaveAndClose
}) => {
  const theme = useTheme()

  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2.5}
      display='flex'
      alignItems='center'
      gap={1}
    >
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSave}
        >
          Salvar
        </Button>
      )}
      {showSaveButtonLoading && <Skeleton width={110} height={62} />}

      {showSaveAndCloseButton && !showSaveAndCloseButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndClose}
        >
          Salvar e voltar
        </Button>
      )}
      {showSaveAndCloseButtonLoading && <Skeleton width={180} height={60} />}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDelete}
        >
          Apagar
        </Button>
      )}
      {showDeleteButtonLoading && <Skeleton width={112} height={60} />}

      {showNewButton && !showNewButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          {textNew}
        </Button>
      )}
      {showNewButtonLoading && <Skeleton width={112} height={60} />}
      <Divider variant='middle' orientation='vertical' />

      {showReturnButton && !showReturnButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickReturn}
        >
          Voltar
        </Button>
      )}
      {showReturnButtonLoading && <Skeleton width={108} height={60} />}
    </Box>
  )
}

export default DetailTools
