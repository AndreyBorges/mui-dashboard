export interface IDetailToolsProps {
  textNew?: string
  showNewButton?: boolean
  showReturnButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndReturnButton?: boolean

  showNewButtonLoading?: boolean
  showReturnButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showSaveButtonLoading?: boolean
  showSaveAndReturnButtonLoading?: boolean

  onClickNew?: () => void
  onClickReturn?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveAndReturn?: () => void
}
