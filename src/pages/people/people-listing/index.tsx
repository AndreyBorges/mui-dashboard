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
import { T } from 'lang'
import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ListingTools } from 'shared/components'
import { useAppThemeContext } from 'shared/contexts/theme-context'
import { Environment } from 'shared/environment'
import { useDebounce } from 'shared/hooks'
import { BaseLayout } from 'shared/layouts'
import { PeopleSevices } from 'shared/services'
import { IPeople } from 'shared/services/api/types'

const PeopleListing: FC = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000)
  const navigate = useNavigate()
  const { themeName } = useAppThemeContext()

  const [rows, setRows] = useState<IPeople[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const title = T('people.title')
  const actions = T('people.actions')
  const completedName = T('people.completedName')
  const email = T('people.email')
  const newP = T('detailTools.new')
  const newPeople = T('detailTools.newPeople')
  const reallyDelete = T('toast.reallyDelete')
  const peopleExclSuccess = T('toast.peopleExclSuccess')

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
    if (window.confirm(reallyDelete)) {
      PeopleSevices.deleteById(id).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          setRows(rows.filter(row => row.id !== id))
          setTotalCount(totalCount - 1)
          toast.success(peopleExclSuccess, {
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
      title={title}
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText={smDown ? newP : newPeople}
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
              <TableCell width={100}>{actions}</TableCell>
              <TableCell>{completedName}</TableCell>
              <TableCell>{email}</TableCell>
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
      <ToastContainer />
    </BaseLayout>
  )
}

export default PeopleListing
