import { FC, useEffect, useMemo, useState } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CitiesSevices } from 'shared/services'
import { useDebounce } from 'shared/hooks'
import { ICities } from 'shared/services/api/types'
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery
} from '@mui/material'
import { Environment } from 'shared/environment'
import { toast, ToastContainer } from 'react-toastify'
import { useAppThemeContext } from 'shared/contexts/theme-context'

const CitiesListing: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const { debounce } = useDebounce(3000)
  const navigate = useNavigate()

  const [rows, setRows] = useState<ICities[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { themeName } = useAppThemeContext()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      CitiesSevices.getAll(page, search).then(response => {
        setIsLoading(false)

        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          setRows(response.data)
          setTotalCount(response.totalCount)
        }
      })
    })
  }, [search, page])

  const handleDelete = (id: number) => {
    if (window.confirm('Deseja realmente excluir?')) {
      CitiesSevices.deleteById(id).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          setRows(rows.filter(row => row.id !== id))
          setTotalCount(totalCount - 1)
          toast.success('Cidade excluida com sucesso!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: themeName
          })
        }
      })
    }
  }

  return (
    <BaseLayout
      title='Listagem de Cidades'
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText={smDown ? 'Nova' : 'Nova Cidade'}
          searchText={search}
          clickingOnNew={() => navigate('/cities/details/new')}
          changeInSearchText={text =>
            setSearchParams({ search: text, page: '1' }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant='outlined'
        sx={{
          m: 1,
          width: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => navigate(`/cities/details/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.LISTING_EMPTY}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LINES_LIMITS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LINES_LIMITS)}
                    onChange={(_, newPage) =>
                      setSearchParams({ search, page: newPage.toString() }, { replace: true })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      <ToastContainer />
    </BaseLayout>
  )
}

export default CitiesListing
