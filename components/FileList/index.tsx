import React from 'react'
import Selecto from 'react-selecto'

import { FileItem } from '@/api/dto/files.dto'
import { FileCard } from '../FileCard'
import { DrawerFile } from '../DrawerFile'

import styles from './FileList.module.scss'

export type FileSelectType = 'select' | 'unselect'

interface FileListProps {
    items: FileItem[]
    onFileSelect: (id: number, type: FileSelectType) => void
}

interface DrawerItemProps {
    id: number[]
    filename: string
    originalName: string
    size: number
}

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
    const [open, setOpen] = React.useState(false)
    const [currentItem, setCurrentItem] = React.useState<DrawerItemProps>({ id: [], filename: '', originalName: '', size: 0 })
    const [fileName, setFileName] = React.useState('')

    const showDrawer = (item: DrawerItemProps) => {
        setOpen(true)
        setCurrentItem(item)
    }

    return (
        <div className={styles.root}>
            {
                items.map(item => (
                    <div data-id={item.id} key={item.id} className='file' onMouseEnter={() => setFileName(item.originalName)} onDoubleClick={() => showDrawer({ id: [item.id], filename: item.filename, originalName: item.originalName, size: item.size })}>
                        <FileCard filename={item.filename} originalName={item.originalName} />
                    </div>
                ))
            }

            <DrawerFile
                id={currentItem.id}
                originalName={currentItem.originalName}
                filename={currentItem.filename}
                size={currentItem.size}
                open={open}
                setOpen={setOpen}
            />

            <Selecto
                container='.files'
                selectableTargets={['.file']}
                selectByClick
                hitRate={10}
                selectFromInside
                toggleContinueSelect={['shift']}
                continueSelect={false}
                onSelect={e => {
                    e.added.forEach(el => {
                        el.classList.add('active')
                        onFileSelect(Number(el.dataset['id']), 'select')
                    })
                    e.removed.forEach(el => {
                        el.classList.remove('active')
                        onFileSelect(Number(el.dataset['id']), 'unselect')
                    })
                }}
            />
            <div className={styles.filename}>
                <p>{fileName ? fileName : 'Наведите на файл'}</p>
            </div>
        </div>
    )
}
