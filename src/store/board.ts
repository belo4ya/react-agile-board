import {flow, getParent, types} from 'mobx-state-tree';
import api from "../api/api";

const Task = types.model('Task', {
    id: types.identifierNumber,
    createdAt: types.array(types.number),
    updatedAt: types.array(types.number),
    title: types.string,
    description: types.string,
    user: types.number
})

const Section = types.model('Section', {
    id: types.identifierNumber,
    createdAt: types.array(types.number),
    updatedAt: types.array(types.number),
    title: types.string,
    tasks: types.array(Task)
}).actions(self => {
    return {
        load: flow(function* () {
            const {id: boardId} = getParent(self, 2)
            const {id: sectionId} = self

            const {tasks} = yield api.fetchSection(boardId, sectionId)
            self.tasks = tasks
        }),
        afterCreate() {
            this.load()
        }

    }
})

const Board = types.model('Board', {
    id: types.identifierNumber,
    createdAt: types.array(types.number),
    updatedAt: types.array(types.number),
    title: types.string,
    sections: types.array(Section)
})

const BoardStore = types.model('BoardStore', {
    boards: types.array(Board),
    selected: types.safeReference(Board)
}).actions(self => {
    return {
        load: flow(function* () {
            self.boards = yield api.fetchBoards()
            // @ts-ignore
            self.selected = 1
        }),
        afterCreate() {
            this.load()
        }
    }
})

export default BoardStore;