import React from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'

import { checkAuth } from '@/utils/CheckAuth'
import { Layout } from '@/layouts/Layout'
import * as Api from '@/api'
import { FileItem } from '@/api/dto/files.dto'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Files } from '@/modules/Files'

interface DashboardPageProps {
  items: FileItem[]
}

const DashboardPhotosPage: NextPage<DashboardPageProps> = ({ items }) => {
  return (
    <DashboardLayout>
        <Files items={items} withActions/>
    </DashboardLayout>
  )
}

DashboardPhotosPage.getLayout = (page: React.ReactNode) => {
  return <Layout title='Панель управления / Фото'>{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx)

  if ("redirect" in authProps) {
    return authProps
  }

  try {
    const items = await Api.files.getAll('photos')

    return {
      props: { items }
    }
  } catch (error) {
    return {
      props: { items: [] }
    }
  }
}

export default DashboardPhotosPage