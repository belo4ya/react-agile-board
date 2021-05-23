import {types} from 'mobx-state-tree';
import UserStore from "./users";
import BoardStore from "./board";

const RootStore = types.model('RootStore', {
    users: UserStore,
    boards: BoardStore
})

export default RootStore;