import React from 'react'
import { useRouter } from 'next/router'
import { FileOutlined, FileImageOutlined, DeleteOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

import { UploadButton } from '../UploadButton'

import styles from '@/styles/Home.module.scss'

export const Sidebar = () => {
    const router = useRouter()
    const selectedMenu = router.pathname

    return (
        <div className={styles.sidebar}>
            <UploadButton />
            <Menu
                className={styles.menu}
                mode='inline'
                selectedKeys={[selectedMenu]}
                items={[
                    { className: styles.item, key: '/dashboard', icon: <FileOutlined />, label: 'Файлы', onClick: () => router.push('/dashboard') },
                    { className: styles.item, key: '/dashboard/photos', icon: <FileImageOutlined />, label: 'Фото', onClick: () => router.push('/dashboard/photos') },
                    { className: styles.item, key: '/dashboard/trash', icon: <DeleteOutlined />, label: 'Корзина', onClick: () => router.push('/dashboard/trash') },
                ]}
            />
        </div>
    )
}
