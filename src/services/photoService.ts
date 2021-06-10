import * as api from '../api'
import { Photo } from '../types';

export const uploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<Photo>('/products/photo', file);
    return response.data;
}