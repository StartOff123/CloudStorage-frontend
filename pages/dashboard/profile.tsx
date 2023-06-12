import { Button, Modal } from 'antd'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import * as Api from '@/api'
import { User } from '@/api/dto/auth.dto'
import { checkAuth } from '@/utils/CheckAuth'
import { Layout } from '@/layouts/Layout'

import styles from '@/styles/Profile.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface DashboardProfilePageProps {
    userData: User
}

const DashboardProfilePage: NextPage<DashboardProfilePageProps> = ({ userData }) => {
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false)

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
        <main>
            <div className={styles.root}>
                <h1>Мой профиль</h1>
                <br />
                <p>
                    ID: <b>{userData.id}</b>
                </p>
                <p>
                    Полное имя: <b>{userData.fullname}</b>
                </p>
                <p>
                    E-Mail: <b>{userData.email}</b>
                </p>
                <br />
                <Button onClick={confirm} type='primary' danger>
                    Выйти
                </Button>
            </div>
        </main>
    )
}

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
    return <Layout title='Панель управления / Профиль'>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if ("redirect" in authProps) {
        return authProps
    }

    const userData = await Api.auth.getMe()

    return {
        props: {
            userData
        }
    }
}

export default DashboardProfilePage