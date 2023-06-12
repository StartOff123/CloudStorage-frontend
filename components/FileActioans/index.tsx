import React from 'react'

import styles from './FileActions.module.scss'
import { Button, Popconfirm } from 'antd'

interface FileActionsProps {
    onClickRemove: VoidFunction
    onCliclShare: VoidFunction
    isActive: boolean
}

export const FileActions: React.FC<FileActionsProps> = ({ onClickRemove, onCliclShare, isActive }) => {
    return (
        <div className={styles.root}>
            <Button onClick={onCliclShare} disabled={!isActive}>
                Поделиться
            </Button>
            <Button onClick={onClickRemove} disabled={!isActive} type='primary' danger>
                 Удалить
            </Button>
        </div>
    )
}
