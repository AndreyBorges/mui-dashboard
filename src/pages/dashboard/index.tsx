import { FC } from 'react'
import { BaseLayout } from 'shared/layouts'
import { ListingTools } from 'shared/components'

const Dashboard: FC = () => {
  return (
    <BaseLayout
      title='Página Inicial'
      listingTools={<ListingTools showSearchInput newButtonText='New' />}
    >
      testing
    </BaseLayout>
  )
}

export default Dashboard
