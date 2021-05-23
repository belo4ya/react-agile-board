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
    user: User
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

    async fetchUsers(): Promise<User[]> {
        return await this.host.get('/users').then(response => response.data)
    }

    async fetchBoards(): Promise<Board[]> {
        return await this.host.get('/boards').then(response => response.data)
    }

}

export default new Api();