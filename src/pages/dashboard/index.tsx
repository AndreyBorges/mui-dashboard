import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BaseLayout } from 'shared/layouts'
import { CitiesSevices, PeopleSevices } from 'shared/services'

const Dashboard: FC = () => {
  const [isLoadingPeople, setIsLoadingPeople] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [totalCountPeople, setTotalCountPeople] = useState(0)
  const [totalCountCities, setTotalCountCities] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    setIsLoadingCities(true)
    setIsLoadingPeople(true)

    PeopleSevices.getAll(1).then(response => {
      setIsLoadingPeople(false)


      if (response instanceof Error) {
        alert(response.message)
        return
      } else {
        setTotalCountPeople(response.totalCount)
      }
    })

    CitiesSevices.getAll(1).then(response => {
      setIsLoadingCities(false)

      if (response instanceof Error) {
        alert(response.message)
        return
      } else {
        setTotalCountCities(response.totalCount)
      }
    })
  }, [])

  const goToPeople = () => { 
    navigate('/people')
  }

  const goToCities = () => { 
    navigate('/cities')
  }
  return (
    <BaseLayout title='Página Inicial'>
      <Divider sx={{ mb: 6 }} />

      <Box width='100%' display='flex'>
        <Grid container>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card onClick={goToPeople} sx={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de pessoas
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>
                      {' '}
                      {isLoadingPeople ? (
                        <Typography variant='h6'>Carregando...</Typography>
                      ) : (
                        <Typography variant='h1'>{totalCountPeople}</Typography>
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card onClick={goToCities} sx={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de cidades
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {isLoadingCities ? (
                      <Typography variant='h6'>Carregando...</Typography>
                    ) : (
                      <Typography variant='h1'>{totalCountCities}</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  )
}

export default Dashboard
