import React from 'react'

import styles from './FileCard.module.scss'
import { getExtensionFormFileName } from '@/utils/getExtensionFormFileName'
import { isImage } from '@/utils/isImage'
import { getColorByExtension } from '@/utils/getColorByExtension'
import { FileTextOutlined } from '@ant-design/icons'

interface FileCardProps {
    filename: string,
    originalName: string
}

export const FileCard: React.FC<FileCardProps> = ({ originalName, filename }) => {
    const ext = getExtensionFormFileName(filename)
    const imageUrl = ext && isImage(ext) ? 'http://localhost:7777/uploads/' + filename : ''

    const color = getColorByExtension(ext)
    const classColor = styles[color]

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <i className={classColor}>{ext}</i>
                {
                    isImage(ext) ? <img className={styles.image} src={imageUrl} alt='File' /> : <FileTextOutlined />
                }
            </div>
            <div className={styles.filename}>
                <span>{originalName}</span>
            </div>
        </div>
    )
}
