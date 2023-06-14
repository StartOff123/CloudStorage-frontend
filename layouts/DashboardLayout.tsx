import React from 'react'

import { Sidebar } from '@/components/Sidebar'

import styles from "@/styles/Home.module.scss"

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main className={styles.dashboardContainer}>
            <Sidebar />

            <div className='container'>
                {children}
            </div>
        </main>
    )
}
