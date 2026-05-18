import axios from 'axios';

const API_URL = 'http://localhost:8088/api/v1/auth';

export interface InicioSolicitud {
    usuario: string;
    claveAcceso: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
}

export const login = async (data: InicioSolicitud): Promise<TokenResponse> => {
    const response = await axios.post<TokenResponse>(`${API_URL}/login`, data);
    return response.data;
};

export const refrescarToken = async (refreshToken: string): Promise<TokenResponse> => {
    const response = await axios.post<TokenResponse>(
        `${API_URL}/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return response.data;
};