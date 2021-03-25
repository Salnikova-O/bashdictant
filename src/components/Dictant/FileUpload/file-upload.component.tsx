import React, {useState} from 'react';
import { useTheme } from 'styled-components';
import DocumentPicker from 'react-native-document-picker';
import { View, Modal, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Button from '../../../UI/Button/Button.component';
import {
    FileUploadContainer,
    UploadTitle,
    FileName,
    IconButton,
    ItemContainer,
    Size,
    FileType,
    TypeTitle,
    Backdrop,
    ModalView
} from './file-upload.styles';
import { useLanguage } from '../../LanguageProvider/language.provider';
import ClipSVG from '../../../assets/clip.svg';
import TimesSVG from '../../../assets/times.svg';

interface FileuploadProps {
    files: any[],
    changeFiles: (file:any) => void,
    deleteFile: (filename:string) => void,
    uploadType?: 'document' | 'image'
}

const FileUpload:React.FC<FileuploadProps> = ({changeFiles, files, deleteFile}) => {
    const theme = useTheme()
    const {language} = useLanguage()

    const [documentTypeShown, setDocumentTypeShown] = useState<boolean>(false)
    
    const documentOptions: {title: string, value: 'document'|'image'}[] = [
        {title: language.dictant.uploadDocument, value: 'document'},
        {title: language.dictant.uploadImage, value: 'image'},
    ]

    const handleButtonPress = () => {
        if(Platform.OS==='ios'){
            setDocumentTypeShown(true)
        } else handleFileUpload('document')
    }

    const handleFileUpload = (type: 'document'|'image') => {
        if (files.length<10) {
            if(type==='document'){
                (DocumentPicker as any).pickMultiple({
                    type: DocumentPicker.types.allFiles
                })
                .then((files: any) => {
                    changeFiles(files)
                    handleFileTypeClose()
                })
                .catch((err: any) => {
                    if (DocumentPicker.isCancel()) {
        
                    } else {
                        console.log(err)
                    }
                })
            } else {
                ImagePicker.openPicker({
                    multiple: true
                  })
                  .then(images => {
                    changeFiles(images)
                    handleFileTypeClose()
                  })
                  .catch(err => {
                      if(err.message === 'User cancelled image selection'){

                      } else {
                          console.log(err)
                      }
                      
                  })
            }
        } else {

        }
    }

    const handleFileTypeClose = () => {
        setDocumentTypeShown(false)
    }

    const handleFileTypeOnpress = (type: 'document' | 'image') => {
        handleFileUpload(type)
    }

    const FileItem = ({filename, size}: {filename:string, size:number}) => {
        return (
            <ItemContainer>
                <FileName>{filename}</FileName>
                <Size>{size>1000000? Math.round(size/100000)/10 + 'Mb': Math.round(size/100)/10 + 'Kb'}</Size>
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
                        <FileItem key={index} filename={file.name || file.filename} size={file.size}/>
                    )
                })
            }
            <Button
            height='50px'
            bg={theme.palette.buttons.secondary}
            font={theme.palette.text.main}
            border={theme.palette.text.main}
            text={language.dictant.upload}
            onPress={handleButtonPress}
            icon={<ClipSVG style={{marginRight: 5}}/>}
            />
            <Modal
            visible={documentTypeShown}
            animationType={'slide'}
            transparent={true}
            onRequestClose={handleFileTypeClose}
            >
                    <Backdrop onPress={handleFileTypeClose}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, 0.6)'}}>
                        <ModalView>
                        {
                            documentOptions.map((el, index) => {
                                return (
                                    <FileType key={index} onPress={() => handleFileTypeOnpress(el.value)}>
                                        <TypeTitle>{el.title}</TypeTitle>
                                    </FileType>
                                )
                            })
                        }
                        </ModalView>
                    </View>
                    </Backdrop>
            </Modal>

        </FileUploadContainer>
    )
}

export default FileUpload;