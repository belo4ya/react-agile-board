import {flow, types} from 'mobx-state-tree';
import api from "../api/api";

const User = types.model('User', {
    id: types.identifierNumber,
    createdAt: types.array(types.number),
    updatedAt: types.array(types.number),
    name: types.string,
    avatar: types.string
})

const AuthorizedUser = User.named('AuthorizedUser')

const UserStore = types.model('UserStore', {
    users: types.maybe(types.array(User)),
    authorized: types.maybe(AuthorizedUser)
}).actions(self => {
    return {
        load: flow(function* () {
            self.users = yield api.fetchUsers()
            self.authorized = yield api.signIn()
        }),
        afterCreate() {
            this.load()
        }
    }
})

export default UserStore;