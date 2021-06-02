import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
    baseUrl = '/api/users';

    constructor(
        private http: HttpClient
    ) {
    }

    add(user: User) {
        return this.http.post<User>(this.baseUrl, {...user});
    }

    edit(user: User) {
        return this.http.put<User>(`${this.baseUrl}/${user?.id}`, {...user});
    }

    get(id: number) {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    getList() {
        return this.http.get<User[]>(this.baseUrl);
    }
}
