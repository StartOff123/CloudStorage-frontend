import * as icons from '@/assets'

type obj = {
    [key: string]: Info
}

interface Info {
    color: string
    icon: any | null
}

const extSettings: obj = {
    pdf: {
        color: '#d62a32',
        icon: icons.PDF
    },
    doc: {
        color: '#285680',
        icon: icons.DOCX
    },
    docx: {
        color: '#285680',
        icon: icons.DOCX
    },
    txt: {
        color: '#085169',
        icon: icons.TXT
    },
    png: {
        color: '#56338A',
        icon: null
    },
    xml: {
        color: '#D65C27',
        icon: icons.XML
    },
    jpg: {
        color: '#29797A',
        icon: null
    },
    jpeg: {
        color: '#29797A',
        icon: null
    },
    zip: {
        color: '#58873B',
        icon: null
    },
    exe: {
        color: '#C36929',
        icon: icons.EXE
    },
    html: {
        color: '#1B7169',
        icon: icons.HTML
    },
    mp4: {
        color: '#8C1442',
        icon: icons.MP4
    },
    psd: {
        color: '#12516A',
        icon: icons.PSD
    },
    rar: {
        color: '#573582',
        icon: icons.RAR
    },    
} as const

export type Extension = keyof typeof extSettings
export type Color = typeof extSettings[Extension]

export const getColorByExtension = (ext: string): Color => {
    return extSettings[ext]
}