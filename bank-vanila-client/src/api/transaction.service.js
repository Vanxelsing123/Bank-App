import { vilQuery } from "@/core/vil-query/vil-query.lib"

export class TransactionService {
    #BASE_URL = '/transactions'

    getAll(onSuccess) {
        return vilQuery({
            path:
            this.#BASE_URL + `?${new URLSearchParams({
                orderBy: 'desc'
            })}`,
            onSuccess
        })
    }
}