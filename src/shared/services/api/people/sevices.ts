import { Api } from '../'
import { Environment } from 'shared/environment'
import { TPeopleTotCount, IPeople } from '../types'



const getAll = async (page = 1, filter: ''): Promise<TPeopleTotCount | Error> => {
  try {
    const relativeUrl = `/people?${page}=1&_limit=${Environment.LINES_LIMITS}&completedName_like=${filter}`
    const { data, headers } = await Api.get(relativeUrl)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINES_LIMITS)
      }
    }
    return new Error('Erro ao listar os dados')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao buscar os dados')
  }
}

const getById = async (id: number): Promise<IPeople | Error> => {
  try {
    const urlId = `/people/${id}`
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

const create = async (createData: Omit<IPeople, 'id'>): Promise<number | Error> => {
  try {
    const createUrl = `/people`
    const { data } = await Api.post<IPeople>(createUrl, createData)

    if (data) {
      return data.id
    }
    return new Error('Erro ao criar os dados do usuário')
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message || 'Erro ao criar os dados do usuário')
  }
}

const updateById = async (id: number, userData: IPeople): Promise<void | Error> => {
  try {
    const urlId = `/people/${id}`
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
    const urlId = `/people/${id}`
    await Api.delete(urlId)
  } catch (error) {
    console.error(error)
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar os dados do usuário'
    )
  }
}

export const PeopleSevices = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
