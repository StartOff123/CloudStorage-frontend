import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import { checkAuth } from '@/utils/CheckAuth'
import { Layout } from '@/layouts/Layout'
import * as Api from '@/api'

import { FileItem } from '@/api/dto/files.dto'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Files } from '@/modules/Files'

interface DashboardPageProps {
  items: FileItem[]
}

const DashboardPage: NextPage<DashboardPageProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  )
}

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Панель управления / Главная">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx)

  if ("redirect" in authProps) {
    return authProps
  }

  try {
    const items = await Api.files.getAll()

    return {
      props: { items }
    }
  } catch (error) {
    return {
      props: { items: [] }
    }
  }
}

export default DashboardPage