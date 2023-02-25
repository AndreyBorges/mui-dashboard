import { FormHandles } from '@unform/core'
import { useCallback, useRef } from 'react'

const useVForm = () => {
  const formRef = useRef<FormHandles>(null)

  const isSavingAndNew = useRef(false)
  const isSavingAndReturn = useRef(false)

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false
    isSavingAndReturn.current = false
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true
    isSavingAndReturn.current = false
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndReturn = useCallback(() => {
    isSavingAndNew.current = false
    isSavingAndReturn.current = true
    formRef.current?.submitForm()
  }, [])

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current
  }, [])

  const handleIsSaveAndReturn = useCallback(() => {
    return isSavingAndReturn.current
  }, [])

  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndReturn: handleSaveAndReturn,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndReturn: handleIsSaveAndReturn
  }
}

export default useVForm
