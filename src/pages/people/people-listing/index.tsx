import { FC, useEffect, useMemo, useState } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PeopleSevices } from 'shared/services'
import { useDebounce } from 'shared/hooks'
import { IPeople } from 'shared/services/api/types'
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

const PeopleListing: FC = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000)
  const navigate = useNavigate()

  const [rows, setRows] = useState<IPeople[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      PeopleSevices.getAll(page, search).then(response => {
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
      PeopleSevices.deleteById(id).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          setRows(rows.filter(row => row.id !== id))
          setTotalCount(totalCount - 1)
          alert('Excluído com sucesso!')
        }
      })
    }
  }

  return (
    <BaseLayout
      title='Listagem de Pessoas'
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText={smDown ? 'Nova' : 'Nova Pessoa'}
          searchText={search}
          clickingOnNew={() => navigate('/people/details/new')}
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
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => navigate(`/people/details/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.completedName}</TableCell>
                <TableCell>{row.email}</TableCell>
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
    </BaseLayout>
  )
}

export default PeopleListing
