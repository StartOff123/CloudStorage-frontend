import axios from '@/core/axios'
import { FileItem } from './dto/files.dto'

type FileType = 'all' | 'photos' | 'trash'

export const getAll = async (type: FileType = 'all'): Promise<FileItem[]> => {
    return ((await axios.get('/files?type=' + type)).data)
}

export const remove = (ids: number[]): Promise<void> => {
    return axios.delete('/files?ids=' + ids)
}

export const uploadFile = async (options: any) => {
    const { onSucces, onError, file, onProdress } = options

    const formData = new FormData()
    formData.append('file', file)

    const config = {
        headers: { "Content-Type": 'multipart/from-data' },
        onProdress: (event: ProgressEvent) => {
            onProdress({ percent: (event.loaded / event.total) * 100 })
        }
    }

    try {
        const { data } = await axios.post('files', formData, config)
        onSucces()
        return data
    } catch (error) {
        onError({ error })
    }
}