import React from 'react'
import { Button, Drawer, Modal, Image } from 'antd'
import { ExclamationCircleOutlined, FileTextOutlined } from '@ant-design/icons'
import numeral from 'numeral'

import { getColorByExtension } from '@/utils/getColorByExtension'
import { getExtensionFormFileName } from '@/utils/getExtensionFormFileName'
import { isImage } from '@/utils/isImage'
import * as Api from '@/api'

import styles from './DrawerFile.module.scss'

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

    const ext = String(getExtensionFormFileName(filename))
    const imageUrl = ext && isImage(ext) ? 'http://localhost:7777/uploads/' + filename : ''

    const extSettings = getColorByExtension(ext)

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
        <Drawer headerStyle={{ background: '#0071ce' }} size='large' style={{ maxWidth: 500 }} title={`Файл: ${originalName}`} mask={false} placement="right" onClose={onClose} open={open}>
            <div className={styles.root}>
                <div className={styles.top}>
                    <div className={styles.img}>
                        {
                            isImage(ext) ?
                                <Image preview={{ mask: 'Посмотреть изображение',  }} src={imageUrl} className={styles.image} /> :
                                extSettings ? (
                                    <img className={styles.icon} src={extSettings.icon.src} alt="" />
                                ) : (
                                    <FileTextOutlined />
                                )
                        }
                        <div style={extSettings && { background: extSettings.color }}>{ext}</div>
                    </div>
                    <div className={styles.info}>
                        <p>Имя файла: {filename}</p>
                        <p>Оригинальное имя файла: {originalName}</p>
                        <p>Размер файла: {fileSize}</p>
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
            </div>
        </Drawer>
    )
}
