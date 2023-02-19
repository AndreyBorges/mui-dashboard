import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import * as yup from 'yup'

import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { DetailTools } from 'shared/components'
import { BaseLayout } from 'shared/layouts'
import { PeopleSevices } from 'shared/services'
import { IVFormErros, VForm, useVForm, VTextfield } from 'shared/forms'
import { AutocompleteCities } from 'pages/cities'

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
                alert('Salvo com sucesso!')
                navigate(`/people`)
              } else {
                alert('Salvo com sucesso!')
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
                alert('Salvo com sucesso!')
                navigate(`/people`)
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
    if (window.confirm('Deseja realmente excluir?')) {
      PeopleSevices.deleteById(id).then(response => {
        if (response instanceof Error) {
          alert(response.message)
          return
        } else {
          alert('Excluído com sucesso!')
          navigate('/people')
        }
      })
    }
  }

  return (
    <BaseLayout
      title={id === 'new' ? 'Nova Pessoa' : person}
      listingTools={
        <DetailTools
          textNew='Nova Pessoa'
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
              <Typography variant='h6'>Dados do(a) Usuario(a)</Typography>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextfield
                  label='Nome Completo'
                  name='completedName'
                  fullWidth
                  onChange={e => setPerson(e.target.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextfield label='Email' name='email' fullWidth disabled={isLoading} />
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
    </BaseLayout>
  )
}

export default PeapleDetails
