import { FC, useEffect, useMemo, useState } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'
import { useSearchParams } from 'react-router-dom'
import { PeopleSevices } from 'shared/services'
import { useDebounce } from 'shared/hooks'
import { IPeople } from 'shared/services/api/types'
import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from '@mui/material'
import { Environment } from 'shared/environment'

const PeopleListing: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000)
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
          console.log(response)
        }
      })
    })
  }, [search, page])

  return (
    <BaseLayout
      title='Listagem de Pessoas'
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText='Nova Pessoa'
          searchText={search}
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
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
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
