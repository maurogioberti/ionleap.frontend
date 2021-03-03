import { User } from 'src/app/models/entities/user';
import { Cryptography } from '../../utils/cryptography';
import { environment } from 'src/environments/environment';

export class UserSession {
  static get user(): User {
    let cryptography = new Cryptography();
    return JSON.parse(cryptography.decrypt(localStorage.getItem(cryptography.encrypt(environment.userKey))));
  }

  get token(): string {
    let cryptography = new Cryptography();
    return JSON.parse(cryptography.decrypt(localStorage.getItem(cryptography.encrypt(environment.tokenKey))));
  }
}