export interface IListingToolsProps {
  searchText?: string
  showSearchInput?: boolean
  changeInSearchText?: (newText: string) => void
  newButtonText?: string
  showNewButton?: boolean
  clickingOnNew?: () => void
}
