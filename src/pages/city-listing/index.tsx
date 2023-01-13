import { FC, useEffect, useMemo } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'
import { useSearchParams } from 'react-router-dom'

const CityListing: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])

  useEffect(() => {
    
   }, [])

  return (
    <BaseLayout
      title='Listagem de Cidades'
      listingTools={
        <ListingTools
          showSearchInput
          newButtonText='Nova Cidade'
          searchText={search}
          changeInSearchText={text => setSearchParams({ search: text }, { replace: true })}
        />
      }
    >
      {}
    </BaseLayout>
  )
}

export default CityListing
