import { UserResponse } from './user.response';

export interface AuthenticationResponse {
    token: string;
    user: UserResponse;
}