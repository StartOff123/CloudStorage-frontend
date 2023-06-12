import { Extension } from "./getColorByExtension"

export const getExtensionFormFileName = (filename: string) => {
    return filename.split('.').pop() as Extension
}