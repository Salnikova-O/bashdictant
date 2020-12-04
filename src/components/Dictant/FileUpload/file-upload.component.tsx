import React from 'react';
import { useTheme } from 'styled-components';
import DocumentPicker from 'react-native-document-picker';
// import {Platform} from 'react-native';

import Button from '../../../UI/Button/Button.component';
import {
    FileUploadContainer
} from './file-upload.styles';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ClipSVG from '../../../assets/clip.svg';


interface FileuploadProps {
    files: any[],
    changeFiles: (file:any) => void
}

const FileUpload:React.FC<FileuploadProps> = ({changeFiles,files}) => {
    const theme = useTheme()
    const {language} = useLanguage()


    const handleFileUpload = () => {
        (DocumentPicker as any).pickMultiple({
            type: DocumentPicker.types.allFiles
        })
        .then((res: any) => {
            console.log(res)
        })
        .catch((err: any) => {
            if (DocumentPicker.isCancel()) {

            } else {
                console.log(err)
            }
        })
    }

    return (
        <FileUploadContainer>
            <Button
            height='50px'
            bg={theme.palette.buttons.secondary}
            font={theme.palette.text.main}
            border={theme.palette.text.main}
            text={language.dictant.upload}
            onPress={handleFileUpload}
            icon={<ClipSVG style={{marginRight: 5}}/>}
            />
        </FileUploadContainer>
    )
}

export default FileUpload;