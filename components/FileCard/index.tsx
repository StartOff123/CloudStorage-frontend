import React from 'react'
import { FileTextOutlined } from '@ant-design/icons'

import { getExtensionFormFileName } from '@/utils/getExtensionFormFileName'
import { isImage } from '@/utils/isImage'
import { getColorByExtension } from '@/utils/getColorByExtension'

import styles from './FileCard.module.scss'

interface FileCardProps {
    filename: string,
    originalName: string
}

export const FileCard: React.FC<FileCardProps> = ({ originalName, filename }) => {
    const ext = String(getExtensionFormFileName(filename))
    const imageUrl = ext && isImage(ext) ? 'http://localhost:7777/uploads/' + filename : ''

    const extSettings = getColorByExtension(ext)

    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <i style={ extSettings && { background: extSettings.color }}>{ext}</i>
                {
                    isImage(ext) ? 
                        <img className={styles.image} src={imageUrl} alt='File' /> : 
                        extSettings ? (
                            <img className={styles.iconImg} src={extSettings.icon.src} alt="" />
                        ) : (
                            <FileTextOutlined />
                        )
                }
            </div>
            <div className={styles.filename}>
                <span>{originalName}</span>
            </div>
        </div>
    )
}
