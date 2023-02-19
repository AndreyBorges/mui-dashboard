import { Api } from '../'
import { Environment } from 'shared/environment'
import { TCitiesTotCount, ICities } from '../types'



const getAll = async (page = 1, filter: string = ''): Promise<TCitiesTotCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${Environment.LINES_LIMITS}&name_like=${filter}`
    const { data, headers } = await Api.get(relativeUrl)

    if (!data) {
      return new Error('Erro ao listar os dados')
    }
    return {
      data,
      totalCount: Number(headers['x-total-count'] || Environment.LINES_LIMITS)
    }
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao buscar os dados')
  }
}

const getById = async (id: number): Promise<ICities | Error> => {
  try {
    const urlId = `/cities/${id}`
    const { data } = await Api.get(urlId)

    if (data) {
      return data
    }
    return new Error('Erro ao consultar os dados do usuário')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao buscar os dados do usuário')
  }
}

const create = async (createData: Omit<ICities, 'id'>): Promise<number | Error> => {
  try {
    const createUrl = `/cities`
    const { data } = await Api.post<ICities>(createUrl, createData)

    if (data) {
      return data.id
    }
    return new Error('Erro ao criar os dados do usuário')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar os dados do usuário')
  }
}

const updateById = async (id: number, userData: ICities): Promise<void | Error> => {
  try {
    const urlId = `/cities/${id}`
    await Api.put(urlId, userData)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao alterar os dados do usuário'
    )
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const urlId = `/cities/${id}`
    await Api.delete(urlId)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar os dados do usuário'
    )
  }
}

export const CitiesSevices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
