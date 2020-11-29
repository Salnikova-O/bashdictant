import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../LanguageProvider/language.provider';

import {
    Page,
    PageText,
    PagesContainer,
    PaginationContainer,
    Legend
} from './pagination.styles';

interface PaginationProps {
    perPage: number,
    currentpage: number,
    totalAmount: number,
    setCurrentPage: (index:number) => void
}

const Pagination:React.FC<PaginationProps> = ({currentpage,perPage,totalAmount, setCurrentPage}) => {
    const [pages, setPages] = useState<(string|number)[]>([])
    const {language}  = useLanguage();


    useEffect(() => {
        const newPages = getPagesForDisplay(currentpage, perPage, totalAmount)
        setPages(newPages)
    }, [currentpage, perPage, totalAmount])


    const getPagesForDisplay = (currentPage:number, perPage:number, totalAmount:number) => {
        const pages = Math.ceil(totalAmount/perPage)
        if (pages<6) {
            const p: number[] = []
            Array.from(Array(pages).keys()).forEach((pa, index) => {
                p.push(index+1)
            } )
            return p
        } else {
            const p = []
            if (currentPage<5) {
                for (let i=1; i<currentPage+3;i++) {
                    p.push(i)
                }
                p.push('...')
                p.push(pages)
            } else if (currentPage>pages-4) {
                p.push(1)
                p.push('...')
                for (let i=currentPage-3; i<pages+1;i++) {
                    p.push(i)
                }
            } else {
                p.push(1)
                p.push('...')
                for (let i=currentPage-2; i<currentPage+3;i++) {
                    p.push(i)
                }
                p.push('...')
                p.push(pages)
            }
            return p
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const getLegendString = ():string => {
        const showed = perPage>1? language.participation.pagination.showed: language.participation.pagination.page
        const from = perPage>1? ((currentpage-1)*perPage+1).toString()+ '-': ''
        const to = (currentpage)*perPage<totalAmount? (currentpage)*perPage: totalAmount
        const of  = language.participation.pagination.of
        const total = totalAmount
        return showed + ' ' + from  + to + ' ' + of + ' '+ total
    } 
    
    return (
        <PaginationContainer>
            <Legend>
                {getLegendString()}
            </Legend>
            <PagesContainer>
                {
                    pages.map((page, index) => {
                        return (
                            <Page
                            key={index}
                            active={page===currentpage}
                            onPress={page!=='...'? () => handlePageChange(page as number): undefined}
                            >
                                <PageText
                                active={page===currentpage}
                                >
                                    {page}
                                </PageText>
                            </Page>
                        )
                    })
                }
            </PagesContainer>
        </PaginationContainer>
    )
}


export default Pagination