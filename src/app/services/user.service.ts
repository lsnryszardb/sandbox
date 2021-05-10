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
        return this.http.post(this.baseUrl, {...user});
    }

    getList() {
        return this.http.get<User[]>(this.baseUrl);
    }
}
