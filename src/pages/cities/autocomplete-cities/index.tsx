import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { FC, useEffect, useMemo, useState } from 'react'
import { CitiesSevices } from 'shared/services'
import { useDebounce } from 'shared/hooks'
import { useField } from '@unform/core'

interface IAutocompleteOption {
  id: number
  label: string
}

interface IAutocompleteCitiesProps {
  isExternalLoading: boolean
}

const AutocompleteCities: FC<IAutocompleteCitiesProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId')
  const [options, setOptions] = useState<IAutocompleteOption[]>([])
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const { debounce } = useDebounce()

  const handleAutocompleteChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: IAutocompleteOption | null
  ) => {
    setSelectedId(newValue?.id)
    setSearch('')
    clearError()
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    })
  }, [registerField, fieldName, selectedId])

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      CitiesSevices.getAll(1).then(response => {
        setIsLoading(false)

        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          setOptions(
            response.data.map(city => ({
              id: city.id,
              label: city.name
            }))
          )
        }
      })
    })
  }, [search])

  const autoCompletedSelectedOption = useMemo(() => {
    if (!selectedId) return null

    const selectedOption = options.find(option => option.id === selectedId)
    if (!selectedOption) return null
    return selectedOption
  }, [selectedId, options])

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      value={autoCompletedSelectedOption}
      {...{ options }}
      disabled={isExternalLoading}
      loading={isLoading}
      onInputChange={(_, newValue) => setSearch(newValue)}
      popupIcon={isLoading || isExternalLoading ? <CircularProgress size={28} /> : undefined}
      onChange={handleAutocompleteChange}
      renderInput={params => (
        <TextField {...params} error={!!error} helperText={error} label='Cidade' />
      )}
    />
  )
}

export default AutocompleteCities
