import { FC, useEffect, useMemo } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'
import { useSearchParams } from 'react-router-dom'
import { PeopleSevices } from 'shared/services'
import { useDebounce } from 'shared/hooks'

const PeopleListing: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(3000)
  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    debounce(() => {
      PeopleSevices.getAll(1, search).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          console.log(response)
        }
      })
    })
  }, [search])

  return (
    <BaseLayout
      title='Listagem de Pessoas'
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText='Nova Pessoa'
          searchText={search}
          changeInSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >
      {}
    </BaseLayout>
  )
}

export default PeopleListing
