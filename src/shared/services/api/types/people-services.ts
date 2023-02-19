export interface IPeople {
  id: number
  completedName: string
  cityId: number
  email: string
}


export  type TPeopleTotCount = {
  data: IPeople[]
  totalCount: number
}
