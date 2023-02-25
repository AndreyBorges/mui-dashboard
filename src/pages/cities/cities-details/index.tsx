import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import * as yup from 'yup'

import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { T } from 'lang'
import { toast, ToastContainer } from 'react-toastify'
import { DetailTools } from 'shared/components'
import { useAppThemeContext } from 'shared/contexts/theme-context'
import { IVFormErros, useVForm, VForm, VTextfield } from 'shared/forms'
import { BaseLayout } from 'shared/layouts'
import { CitiesSevices } from 'shared/services'

interface IFromData {
  name: string
}

const formValidationSchema: yup.ObjectSchema<IFromData> = yup.object().shape({
  name: yup.string().required().min(3)
})

const CitiesDetails: FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState('')
  const { formRef, save, saveAndReturn, isSaveAndReturn } = useVForm()
  const { themeName } = useAppThemeContext()
  const title = T('detailTools.newCity')
  const dataCity = T('cities.details.dataCity')
  const nameCity = T('cities.details.nameCity')
  const newCity = T('detailTools.newCity')
  const toastSuccess = T('toast.saveSuccess')
  const reallyDelete = T('toast.reallyDelete')

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)
      CitiesSevices.getById(Number(id)).then(resp => {
        setIsLoading(false)
        if (resp instanceof Error) {
          alert(resp.message)
          navigate('/cities')
        } else {
          setCity(resp.name)
          formRef.current?.setData(resp)
        }
      })
    }
    formRef.current?.setData({
      name: ''
    })
  }, [id])

  const handleSave = (data: IFromData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validityData => {
        setIsLoading(true)
        if (id === 'new') {
          CitiesSevices.create(validityData).then(response => {
            setIsLoading(false)
            if (response instanceof Error) {
              alert(response.message)
              return
            } else {
              if (isSaveAndReturn()) {
                navigate(`/cities`)
              } else {
                navigate(`/cities/details/${response}`)
              }
            }
          })
        } else {
          CitiesSevices.updateById(Number(id), { id: Number(id), ...validityData }).then(resp => {
            setIsLoading(false)
            if (resp instanceof Error) {
              alert(resp.message)
              return
            } else {
              if (isSaveAndReturn()) {
                navigate(`/cities`)
              } else {
                toast.success(toastSuccess, {
                  position: 'top-right',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: themeName
                })
              }
            }
          })
        }
      })
      .catch((err: yup.ValidationError) => {
        const validationErros: IVFormErros = {}

        err.inner.forEach(error => {
          if (!error.path) return
          validationErros[error.path] = error.message
        })
        formRef.current?.setErrors(validationErros)
      })
  }

  const handleDelete = (id: number) => {
    if (window.confirm(reallyDelete)) {
      CitiesSevices.deleteById(id).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          navigate('/')
        }
      })
    }
  }

  return (
    <BaseLayout
      title={id === 'new' ? title : city}
      listingTools={
        <DetailTools
          textNew={newCity}
          showSaveAndReturnButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSave={save}
          onClickSaveAndReturn={saveAndReturn}
          onClickNew={() => navigate('/cities/details/new')}
          onClickReturn={() => navigate('/cities')}
          onClickDelete={() => handleDelete(Number(id))}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}
            <Grid item>
              <Typography variant='h6'>{dataCity}</Typography>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextfield
                  label={nameCity}
                  name='name'
                  fullWidth
                  onChange={e => setCity(e.target.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
      <ToastContainer />
    </BaseLayout>
  )
}

export default CitiesDetails
