export interface IDetailToolsProps {
  textNew?: string
  showNewButton?: boolean
  showReturnButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndCloseButton?: boolean

  showNewButtonLoading?: boolean
  showReturnButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showSaveButtonLoading?: boolean
  showSaveAndCloseButtonLoading?: boolean

  onClickNew?: () => void
  onClickReturn?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveAndClose?: () => void
}
