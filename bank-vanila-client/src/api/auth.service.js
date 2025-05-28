import { NotificationService } from "@/core/services/notification.service"
import { Store } from "@/core/store/store"
import { vilQuery } from "@/core/vil-query/vil-query.lib"

export class AuthService {
    #BASE_URL = '/auth'

    constructor() {
        this.store = Store.getInstance()
        this.notificationService = new NotificationService()
    }

    main(type, body) {
        return vilQuery({
            path: `${this.#BASE_URL}/${type}`,
            body,
            onSuccess: data => {
                this.store.login(data.user, data.accessToken)
                this.notificationService.show(
                    'success',
                    'You have successfully logged in!'
                )
            },
            method: 'POST'
        })
    }
}