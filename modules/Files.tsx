import { FileItem } from '@/api/dto/files.dto'
import { FileActions } from '@/components/FileActioans'
import { FileList, FileSelectType } from '@/components/FileList'
import { Empty, Modal } from 'antd'
import React from 'react'
import * as Api from '@/api'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface FilesProps {
    items: FileItem[]
    withActions?: boolean
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false)
    const [files, setFiles] = React.useState(items || [])
    const [selectIds, setSelectIds] = React.useState<number[]>([])

    const confirm = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: `Вы действительно хотите удалить выбранный(е) файл(ы)?`,
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
        setSelectIds([])
        setFiles(perv => perv.filter(file => !selectIds.includes(file.id)))
        Api.files.remove(selectIds)
        window.location.reload()
    }

    const handleCancelLogout = () => setOpenLogoutModal(false)

    const onFileSelect = (id: number, type: FileSelectType) => {
        if (type === 'select') {
            setSelectIds(prev => [...prev, id])
        } else {
            setSelectIds(prev => prev.filter(_id => _id !== id))
        }
    }

    const onClickRemove = () => {
        setSelectIds([])
        setFiles(perv => perv.filter(file => !selectIds.includes(file.id)))
        Api.files.remove(selectIds)
        window.location.reload()
    }

    const onFileShare = () => {
        alert('share')
    }

    return (
        <>
            {
                files.length ?
                    <>
                        {withActions && <FileActions onClickRemove={confirm } onCliclShare={onFileShare} isActive={selectIds.length > 0} />}
                        <FileList items={files} onFileSelect={onFileSelect}/>
                    </>
                    : (
                        <Empty className='empty-block' style={{ width: '100%' }} description='Список файлов пуст' />
                    )
            }
        </>
    )
}
