const extColor = {
    pdf: "purple",
    xls: "green",
    torrent: "green",
    doc: "blue",
    docx: "blue",
    txt: "blue",
    png: "orange",
    xml: "orange",
    jpg: "orange",
    jpeg: "orange",
    zip: "red",
} as const

export type Extension = keyof typeof extColor
export type Color = typeof extColor[Extension]

export const getColorByExtension = (ext: string): Color => {
    return extColor[ext]
}