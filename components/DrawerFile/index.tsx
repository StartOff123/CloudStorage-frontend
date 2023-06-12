import { Button, Drawer, Modal, Popconfirm } from 'antd'
import numeral from 'numeral'
import React from 'react'

import { getColorByExtension } from '@/utils/getColorByExtension'
import { getExtensionFormFileName } from '@/utils/getExtensionFormFileName'
import { isImage } from '@/utils/isImage'
import { ExclamationCircleOutlined, FileTextOutlined } from '@ant-design/icons'
import styles from './DrawerFile.module.scss'
import * as Api from '@/api'

interface DrawerFileProps {
    id: number[]
    filename: string
    originalName: string
    size: number
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DrawerFile: React.FC<DrawerFileProps> = ({ filename, originalName, open, setOpen, size, id }) => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false)

    const ext = getExtensionFormFileName(filename)
    const imageUrl = ext && isImage(ext) ? 'http://localhost:7777/uploads/' + filename : ''

    const color = getColorByExtension(ext)
    const classColor = styles[color]

    const fileSize = numeral(size).format('0.0 b')

    const onClose = () => {
        setOpen(false)
    }

    const confirm = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: `Вы действительно хотите удалить файл: ${originalName}?`,
            okType: 'danger',
            okText: 'Удалить',
            cancelText: 'Отмена',
            title: "Удаление",
            open: openLogoutModal,
            onOk: handleOkLogout,
            onCancel: handleCancelLogout
        })
    }

    const handleOkLogout = () => {
        Api.files.remove(id)
        setOpenLogoutModal(false)
        window.location.reload()
    }

    const handleCancelLogout = () => setOpenLogoutModal(false)

    return (
        <Drawer headerStyle={{ background: '#0071ce' }} title={`Файл: ${originalName}`} mask={false} placement="right" onClose={onClose} open={open}>
            <div className={styles.root}>
                <div className={styles.top}>
                    <div className={styles.img}>
                        {
                            isImage(ext) ? <img className={styles.image} src={imageUrl} alt='File' /> : <FileTextOutlined />
                        }
                        <div className={classColor}>{ext}</div>
                    </div>
                    <div className={styles.info}>
                        <p>Имя файла: {filename}</p>
                        <p>Оригинальное имя файла: {originalName}</p>
                        <p>Размер файла: {fileSize}</p>
                    </div>
                </div>
                <div className={styles.btn}>
                    <Button style={{ marginRight: '10px' }}>
                        Поделиться
                    </Button>
                    <Button onClick={confirm} type='primary' danger>
                        Удалить
                    </Button>
                </div>
            </div>
        </Drawer>
    )
}
