import { Box, Grid, LinearProgress, Paper, Typography, Theme, useMediaQuery } from '@mui/material'
import * as yup from 'yup'

import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { DetailTools } from 'shared/components'
import { BaseLayout } from 'shared/layouts'
import { PeopleSevices } from 'shared/services'
import { IVFormErros, VForm, useVForm, VTextfield } from 'shared/forms'
import { AutocompleteCities } from 'pages/cities'
import { useAppThemeContext } from 'shared/contexts/theme-context'
import { toast, ToastContainer } from 'react-toastify'
import { t } from 'lang'

interface IFromData {
  email: string
  cityId: number
  completedName: string
}

const formValidationSchema: yup.ObjectSchema<IFromData> = yup.object().shape({
  completedName: yup.string().required().min(3),
  email: yup.string().email().required(),
  cityId: yup.number().required()
})

const PeapleDetails: FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [person, setPerson] = useState('')
  const { formRef, save, saveAndReturn, isSaveAndReturn } = useVForm()
  const { themeName } = useAppThemeContext()
  const newPeople = t('detailTools.newPeople')
  const dataUser = t('people.details.dataUser')
  const completedName = t('people.details.completedName')
  const email = t('people.details.email')
  const reallyDelete = t('toast.reallyDelete')
  const toastSuccess = t('toast.saveSuccess')

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)
      PeopleSevices.getById(Number(id)).then(resp => {
        setIsLoading(false)
        if (resp instanceof Error) {
          alert(resp.message)
          navigate('/people')
        } else {
          setPerson(resp.completedName)
          formRef.current?.setData(resp)
        }
      })
    }
    formRef.current?.setData({
      email: '',
      cityId: undefined,
      completedName: ''
    })
  }, [id])

  const handleSave = (data: IFromData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then(validityData => {
        setIsLoading(true)
        if (id === 'new') {
          PeopleSevices.create(validityData).then(response => {
            setIsLoading(false)
            if (response instanceof Error) {
              alert(response.message)
              return
            } else {
              if (isSaveAndReturn()) {
                navigate(`/people`)
              } else {
                navigate(`/people/details/${response}`)
              }
            }
          })
        } else {
          PeopleSevices.updateById(Number(id), { id: Number(id), ...validityData }).then(resp => {
            setIsLoading(false)
            if (resp instanceof Error) {
              alert(resp.message)
              return
            } else {
              if (isSaveAndReturn()) {
                navigate(`/people`)
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
      PeopleSevices.deleteById(id).then(response => {
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
      title={id === 'new' ? newPeople : person}
      listingTools={
        <DetailTools
          textNew={newPeople}
          showSaveAndReturnButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSave={save}
          onClickSaveAndReturn={saveAndReturn}
          onClickNew={() => navigate('/people/details/new')}
          onClickReturn={() => navigate('/people')}
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
              <Typography variant='h6'>{dataUser}</Typography>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextfield
                  label={completedName}
                  name='completedName'
                  fullWidth
                  onChange={e => setPerson(e.target.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextfield label={email} name='email' fullWidth disabled={isLoading} />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <AutocompleteCities isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
      <ToastContainer />
    </BaseLayout>
  )
}

export default PeapleDetails
