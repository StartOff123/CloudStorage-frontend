import React from 'react'
import { Button, Upload, UploadFile, notification } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import * as Api from '@/api'

import styles from '@/styles/Home.module.scss'

export const UploadButton = () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([])

    const onUploadSucces = async (options: any) => {
        try {
            await Api.files.uploadFile(options)
            setFileList([])
            window.location.reload()
        } catch (error) {
            notification.error({
                message: 'Ошибка!',
                description: 'Не удалось загрузить файл.',
                duration: 2
            })
        }
    }

    return (
        <Upload
            customRequest={onUploadSucces}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            className={styles.upload}
        >
            <Button type='primary' icon={<CloudUploadOutlined />} size='large'>
                Загрузить файл
            </Button>
        </Upload>
    )
}
