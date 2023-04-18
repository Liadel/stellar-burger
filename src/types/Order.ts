export type Order = {
  _id: string,
  ingredients: string[],
  status: string, // enum?
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}