import { FC } from 'react'
import { BaseLayout } from 'shared/layouts'
import { DetailTools } from 'shared/components'

const Dashboard: FC = () => {
  return (
    <BaseLayout title='Página Inicial' listingTools={
      <DetailTools
        showSaveAndCloseButton
      />
    }>
    </BaseLayout>
  )
}

export default Dashboard
