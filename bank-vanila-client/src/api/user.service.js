import { vilQuery } from "@/core/vil-query/vil-query.lib"

export class UserService {
    #BASE_URL = '/users'

    getAll(searchTerm, onSuccess) {
        return vilQuery({
            path: `${this.#BASE_URL}${searchTerm 
                ? `?${new URLSearchParams({
                    searchTerm
                })}`
                : ''
            }`,
            onSuccess
        })
    }
}