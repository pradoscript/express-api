type FilterProps = {
    status?: string
    id?: string
}

type Rows = {
    id: string
    order: string
    price: number
    status: string
}

type DatabaseStorage = {
    [tableName: string]: Rows[]
}

export type { FilterProps, Rows, DatabaseStorage }