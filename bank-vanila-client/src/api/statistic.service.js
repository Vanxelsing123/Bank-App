import { vilQuery } from "@/core/vil-query/vil-query.lib"

export class StatisticService {
    #BASE_URL = '/statistics'

    main(onSuccess) {
        return vilQuery({
            path: this.#BASE_URL,
            onSuccess
        })
    }
}