import {$host} from "./index";
import {AxiosInstance} from "axios";

interface ApiAnswer {
    id: number,
    createdAt: number[],
    updatedAt: number[]
}

interface User extends ApiAnswer {
    name: string,
    avatar: string
}

interface Task extends ApiAnswer {
    title: string,
    description: string,
    user: number
}

interface Section extends ApiAnswer {
    title: string,
    tasks: Task[]
}

interface Board extends ApiAnswer {
    title: string,
    sections: Section[]
}

class Api {
    private host: AxiosInstance;

    constructor() {
        this.host = $host
    }

    async signIn(): Promise<User> {
        return await this.host.post('/auth/signIn', {name: 'belo4ya'}).then(response => response.data)
    }

    async fetchUsers(): Promise<User[]> {
        return await this.host.get('/users').then(response => response.data)
    }

    async fetchBoards(): Promise<Board[]> {
        return await this.host.get('/boards').then(response => response.data)
    }

    async fetchSection(boardId: number, sectionId: number): Promise<Section[]> {
        return await this.host.get(`/boards/${boardId}/sections/${sectionId}`).then(response => response.data)
    }

}

export default new Api();