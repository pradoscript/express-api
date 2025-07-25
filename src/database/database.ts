import fs from 'node:fs/promises'
import { Rows, FilterProps, DatabaseStorage } from '../types/OrderTyps.js'

const DATABASE_PATH = new URL('db.json', import.meta.url)


class Database {
    #database: DatabaseStorage = {}

    constructor() {
        fs.readFile(DATABASE_PATH, 'utf-8').then((data) => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    create(table: string, data: Rows) {
        if (!this.#database[table]) {
            this.#database[table] = [data]
            this.#persist()
        } else {
            this.#database[table].push(data)
            this.#persist()
        }
    }

    select(table: string, filters?: FilterProps): Rows[] {
        let data = this.#database[table] ?? []

        if (filters) {
            data = data.filter((row) => {
                return Object.entries(filters).some(([key, value]) => {
                    const field = row[key as keyof Rows]
                    if (typeof field === 'string' && typeof value === 'string') {
                        return field.toLowerCase().includes(value.toLowerCase())
                    }
                    return false
                })
            })
        }

        return data
    }

    update(table: string, id: string) {
        let data = this.#database[table] ?? []
        const index = data.findIndex((row) => row.id === id)
        if (index !== -1) {
            data[index].status = 'closed'
            this.#persist()
            return data[index]
        } else {
            return false
        }
    }

    delete(table: string, id: string) {
        let data = this.#database[table] ?? []
        const index = data.findIndex((row) => row.id === id)
        if (index !== -1) {
            const deletedRow = data[index]
            data.splice(index, 1)
            this.#persist()
            return deletedRow
        } else {
            return false
        }
    }


}

export const database = new Database()


// http://localhost:3334/orders?status=closed