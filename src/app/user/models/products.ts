export interface Products {
      id: number,
      name: string,
      brand: string,
      gender: string,
      category: string,
      price: number,
      is_in_inventory: boolean,
      items_left: number,
      imageURL: string,
      quantity: number,
      isPending: boolean,
      total?: number
}
