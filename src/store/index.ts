import {types} from 'mobx-state-tree';
import UserStore from "./users";
import BoardStore from "./board";

const RootStore = types.model('RootStore', {
    users: types.optional(UserStore, {}),
    boards: types.optional(BoardStore, {})
})

export default RootStore;