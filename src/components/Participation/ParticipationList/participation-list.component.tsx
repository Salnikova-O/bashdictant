import { useFocusEffect } from '@react-navigation/native';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {Platform, LayoutAnimation, UIManager} from 'react-native';
import { useSelector } from 'react-redux';


import { IExpert, IStudent } from '../../../@types/common';
import { students } from '../../../dummyList';
import { userSelectors } from '../../../redux/user/user.selectors';
import Pagination from '../Pagination/pagination.component';
import ParticipationItem from '../ParticipationItem/participation-item.component';
import {Header} from './participation-list.styles';
import {getStudents, getExperts} from './participation.utils';

interface ItemsList {
    header: string,
    togglePopup: (user?: IStudent | IExpert | undefined) => void,
    tabIndex:number
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }




const perPage = 12

const ParticipationList: React.FC<ItemsList> = ({ header, togglePopup, tabIndex}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState<IExpert[]|IStudent[]>([])
    const [initialRender, setInitialRender] = useState(true)
    const [total,setTotal]= useState(1)
    const currentUser = useSelector(userSelectors.currentUser)
    const jwt = useSelector(userSelectors.jwt)

    useFocusEffect(
        useCallback(() => {
            console.log('focus')
            if (currentUser?.role==='teacher') {
                if (tabIndex===0) {
                    getStudents(jwt, 'student', perPage, (currentPage-1)*perPage)
                    .then(({total, students}) => {
                        setTotal(total?total:1)
                        LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
                        setFilteredUsers(students?students: [])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else if (tabIndex===1) {
                    getStudents(jwt, 'pinstudent', perPage, (currentPage-1)*perPage)
                    .then(({total, students}) => {
                        setTotal(total?total:1)
                        LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
                        setFilteredUsers(students?students: [])
                        console.log(students)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            } else  if (currentUser?.role==='organizer') {
                if (tabIndex===0) {
                    getExperts(jwt, 'student', perPage, (currentPage-1)*perPage)
                    .then(({total, users}) => {
                        setTotal(total?total:1)
                        LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
                        setFilteredUsers(users?users:[])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else if (tabIndex===1) {
                    getExperts(jwt, 'teacher', perPage, (currentPage-1)*perPage)
                    .then(({total, users}) => {
                        setTotal(total?total:1)
                        console.log('teachers',users)
                        LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
                        setFilteredUsers(users?users:[])
    
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            }
        }, [currentPage])
    )


    // useEffect(() => {
    //     if (currentUser?.role==='teacher') {
    //         if (tabIndex===0) {
    //             getStudents(jwt, 'student', perPage, (currentPage-1)*perPage)
    //             .then(({total, students}) => {
    //                 setTotal(total?total:1)
    //                 LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
    //                 setFilteredUsers(students)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         } else if (tabIndex===1) {
    //             getStudents(jwt, 'pinstudent', perPage, (currentPage-1)*perPage)
    //             .then(({total, students}) => {
    //                 setTotal(total?total:1)
    //                 LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
    //                 setFilteredUsers(students)

    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     } else  if (currentUser?.role==='organizer') {
    //         if (tabIndex===0) {
    //             getExperts(jwt, 'student', perPage, (currentPage-1)*perPage)
    //             .then(({total, users}) => {
    //                 setTotal(total?total:1)
    //                 LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
    //                 setFilteredUsers(users)
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         } else if (tabIndex===1) {
    //             getExperts(jwt, 'teacher', perPage, (currentPage-1)*perPage)
    //             .then(({total, users}) => {
    //                 setTotal(total?total:1)
    //                 console.log('teachers',users)
    //                 LayoutAnimation.configureNext({ duration: 700, create: { type: 'spring', springDamping: 0.4, property: 'opacity' }, update: { type: 'spring', springDamping: 0.4 },  })
    //                 setFilteredUsers(users)

    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     }
    // }, [currentPage])



    const changeCurrentPage = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Fragment>
            <Header>
                {header}
            </Header>
            {
                (filteredUsers as any).map((user: IStudent|IExpert, index: number) => {
                    return (
                        <ParticipationItem
                        index={(index+1)+perPage*(currentPage-1)}
                        key={index}
                        user={user}
                        togglePopup={togglePopup}
                        pinned={currentUser?.role==='teacher'&&tabIndex===1}
                        />
                    )
                })
            }
            <Pagination
            currentpage={currentPage}
            setCurrentPage={changeCurrentPage}
            perPage={perPage}
            totalAmount={total}
            />
        </Fragment>
    )
}



export default ParticipationList;