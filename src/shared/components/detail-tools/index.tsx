import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  useTheme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { FC } from 'react'
import { IDetailToolsProps } from '../'

const DetailTools: FC<IDetailToolsProps> = ({
  textNew = 'Novo',
  showNewButton = true,
  showReturnButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndReturnButton = false,

  showNewButtonLoading = false,
  showReturnButtonLoading = false,
  showDeleteButtonLoading = false,
  showSaveButtonLoading = false,
  showSaveAndReturnButtonLoading = false,

  onClickNew,
  onClickReturn,
  onClickDelete,
  onClickSave,
  onClickSaveAndReturn
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

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
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>
      )}
      {showSaveButtonLoading && <Skeleton width={110} height={62} />}

      {showSaveAndReturnButton && !showSaveAndReturnButtonLoading && !smDown && !mdDown && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndReturn}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {showSaveAndReturnButtonLoading && !smDown && !mdDown && <Skeleton width={180} height={60} />}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDelete}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && <Skeleton width={112} height={60} />}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {textNew}
          </Typography>
        </Button>
      )}
      {showNewButtonLoading && !smDown && <Skeleton width={112} height={60} />}
      {showReturnButton &&
        (
          showNewButton ||
          showSaveButton ||
          showSaveAndReturnButton ||
          showDeleteButton
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )}

      {showReturnButton && !showReturnButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickReturn}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>
      )}
      {showReturnButtonLoading && <Skeleton width={108} height={60} />}
    </Box>
  )
}

export default DetailTools
