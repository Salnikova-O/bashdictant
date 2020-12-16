import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../config';
import { userSelectors } from '../../redux/user/user.selectors';
import DictantView from '../DictantView/dictant-view.components';
import {
    Container,
    GradeContainer,
    GradeText,
    FileName,
    ItemContainer
} from './dictant-read.styles';
import { useLanguage } from '../LanguageProvider/language.provider';
import Grade from '../../UI/Grade/grade.component';
import { GradeTypes } from '../../@types/common';
import GetCertificate from '../GetCertificate/get-certificate.component';




const DictantRead: React.FC = () => {
    const [currenDictant, setCurrentDictant] = useState<{text:string, markers: {text:string, position:number}[]}|undefined>(undefined)
    const [files, setCurrentFiles] = useState<any[]>([])
    const jwt = useSelector(userSelectors.jwt)
    const {language} = useLanguage()
    const [grade, setGrade] = useState<GradeTypes|null>(null)
    const [certReceived, setCertReceived] = useState(false)


    useEffect(() => {
        axios.get(`${API_URL}/cabinet/student/info`,{
            headers: {
                "X-api-token": `${jwt}`
            }
        })
        .then((response) => {
            if (response.data.text) {
                const markers = response.data.markers
                setCurrentDictant({
                    text: response.data.text,
                    markers: markers? markers: []
                })
            } else  if (response.data.names) {
                    setCurrentFiles(response.data.names)
            }
            if (response.data.rating) {
                setGrade(response.data.rating)
            }
            console.log(response.data.send_cert)
            setCertReceived(response.data.send_cert)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [jwt])


    const FileItem = ({filename}: {filename:string}) => {
        return (
            <ItemContainer>
                <FileName>{filename}</FileName>
            </ItemContainer>
        )
    }


    const receiveCert = () => {
        setCertReceived(true)
    }


    return (
        <Container>
            {
                grade?
                <GetCertificate
                received={certReceived}
                setReceived={receiveCert}
                />
                :null
            }
            {
            currenDictant?
            <DictantView
            dictant={currenDictant}
            grade={
                    <GradeContainer>
                        <GradeText>{language.gradeText.title}:</GradeText>
                        {
                            grade?
                            <Grade
                            grade={grade}
                            active={true}
                            />
                            : <GradeText
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                width: 110
                            }}
                            >
                                {language.gradeText.noGrade}
                            </GradeText>
                        }
                    </GradeContainer>
                
            }
            />
            :null
            }
            {
                files.length>0?
                <Fragment>
                    {
                        files.map((file, index) => {
                            return (
                                <FileItem key={index} filename={file}/>
                            )
                        })
                    }
                <GradeContainer>
                        <GradeText>{language.gradeText.title}:</GradeText>
                        {
                            grade?
                            <Grade
                            grade={grade}
                            active={true}
                            />
                            : <GradeText
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                width: 110
                            }}
                            >
                                {language.gradeText.noGrade}
                            </GradeText>
                        }
                    </GradeContainer>
                </Fragment>
                :null
            }

        </Container>
    )
}


export default DictantRead;