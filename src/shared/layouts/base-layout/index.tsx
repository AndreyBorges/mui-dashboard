import { Box } from '@mui/system'
import { FC, ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import { Icon, IconButton, Theme, useMediaQuery, useTheme } from '@mui/material'
import { useDrawerContext } from '../../contexts'

interface IBaseLayoutProps {
  children: ReactNode
  title: string
  toolbar?: ReactNode
}

const BaseLayout: FC<IBaseLayoutProps> = ({ children, title, toolbar }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const theme = useTheme()
  const { toggleDrawerOpen } = useDrawerContext()
  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display='flex'
        alignItems='center'
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  )
}

export default BaseLayout
