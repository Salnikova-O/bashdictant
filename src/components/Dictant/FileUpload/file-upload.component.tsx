import React from 'react';
import { useTheme } from 'styled-components';
import DocumentPicker from 'react-native-document-picker';
// import {Platform} from 'react-native';

import Button from '../../../UI/Button/Button.component';
import {
    FileUploadContainer,
    UploadTitle,
    FileName,
    IconButton,
    ItemContainer
} from './file-upload.styles';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ClipSVG from '../../../assets/clip.svg';
import TimesSVG from '../../../assets/times.svg';

interface FileuploadProps {
    files: any[],
    changeFiles: (file:any) => void,
    deleteFile: (filename:string) => void
}

const FileUpload:React.FC<FileuploadProps> = ({changeFiles,files, deleteFile}) => {
    const theme = useTheme()
    const {language} = useLanguage()


    const handleFileUpload = () => {
        if (files.length<10) {
            (DocumentPicker as any).pickMultiple({
                type: DocumentPicker.types.allFiles
            })
            .then((files: any) => {
                changeFiles(files)
            })
            .catch((err: any) => {
                if (DocumentPicker.isCancel()) {
    
                } else {
                    console.log(err)
                }
            })
        } else {

        }
    }

    const FileItem = ({filename}: {filename:string}) => {
        return (
            <ItemContainer>
                <FileName>{filename}</FileName>
                <IconButton
                onPress={()=> deleteFile(filename)}
                >
                    <TimesSVG/>
                </IconButton>
            </ItemContainer>
        )
    }


    return (
        <FileUploadContainer>
            {
                files.length>0?
                    <UploadTitle>{language.dictant.uploadTitle}</UploadTitle>
                :null
            }
            {
                files.map((file, index) => {
                    return (
                        <FileItem key={index} filename={file.name}/>
                    )
                })
            }
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