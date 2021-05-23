import {flow, types} from 'mobx-state-tree';
import api from "../api/api";

const User = types.model("User", {
    id: types.identifierNumber,
    createdAt: types.string,
    updatedAt: types.string,
    name: types.string,
    avatar: types.string
})

const UserStore = types.model('UserStore', {
    users: types.maybe(types.array(User))
}).actions(self => {
    return {
        load: flow(function* () {
            self.users = yield api.fetchUsers();
        })
    }
})

export default UserStore;