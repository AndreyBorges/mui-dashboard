export interface ICities {
  id: number
  name: string
}

export type TCitiesTotCount = {
  data: ICities[]
  totalCount: number
}
