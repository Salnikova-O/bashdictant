import React from 'react';
import { useTheme } from 'styled-components';
import DocumentPicker from 'react-native-document-picker';

import Button from '../../../UI/Button/Button.component';
import {
    FileUploadContainer
} from './file-upload.styles';



interface FileuploadProps {
    files: any[],
    changeFiles: (file:any) => void
}

const FileUpload:React.FC<FileuploadProps> = ({changeFiles,files}) => {
    console.log(files)
    const theme = useTheme()

    const handleFileUpload = () => {
        DocumentPicker.pick({
            type: ['.jpeg','.png','.pdf', '.jpg']
        })
    }

    return (
        <FileUploadContainer>
            <Button
            height='50px'
            bg={theme.palette.buttons.secondary}
            font={theme.palette.text.main}
            border={theme.palette.text.main}
            text='Upload'
            onPress={handleFileUpload}
            />
        </FileUploadContainer>
    )
}


export default FileUpload;