import React from 'react'
import { useRouter } from 'next/router'
import { Avatar, Button, Layout, Menu, Modal, Popover } from 'antd'
import { CloudOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import * as Api from '@/api'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false)
    const router = useRouter()
    const selectedMenu = router.pathname

    const confirm = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: 'Вы действительно хотите выйти?',
            okType: 'danger',
            okText: 'Выйти',
            cancelText: 'Отмена',
            title: "Выход",
            open: openLogoutModal,
            onOk: handleOkLogout,
            onCancel: handleCancelLogout
        })
    }

    const handleOkLogout = () => {
        Api.auth.logout()
        location.href = '/'
        setOpenLogoutModal(false)
    }

    const handleCancelLogout = () => setOpenLogoutModal(false)

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2>
                        <CloudOutlined />
                        Cloud Storage
                    </h2>
                    <Menu
                        className={styles.topMenu}
                        theme='dark'
                        mode='horizontal'
                        defaultSelectedKeys={[selectedMenu]}
                        onSelect={({ key }) => router.push(key)}
                        items={[
                            { key: '/dashboard', label: 'Главная' },
                            { key: '/dashboard/profile', label: 'Профиль' },
                        ]}
                    />
                </div>
                <div className={styles.headerRight}>
                    <Popover
                        trigger='click'
                        content={
                            <Button onClick={confirm} type='primary' danger>
                                Выйти
                            </Button>
                        }
                    >
                        <Avatar>Д</Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    )
}