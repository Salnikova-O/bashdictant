import React, { Fragment, useEffect, useState } from 'react';
import {Platform, LayoutAnimation, UIManager} from 'react-native';


import { IExpert, IStudent } from '../../../@types/common';
import Pagination from '../Pagination/pagination.component';
import ParticipationItem from '../ParticipationItem/participation-item.component';
import {Header} from './participation-list.styles';

interface ItemsList {
    users: IExpert[]|IStudent[],
    header: string,
    togglePopup: (user?: IStudent | IExpert | undefined) => void
}

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }




const perPage = 6

const ParticipationList: React.FC<ItemsList> = ({users, header, togglePopup}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState<IExpert[]|IStudent[]>(users.slice(0,perPage))
    const [initialRender, setInitialRender] = useState(true)


    useEffect(() => {
        if (initialRender) {
            setInitialRender(false)
        } else {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
            setFilteredUsers(users.slice((currentPage-1)*perPage,currentPage*perPage))
        }
    }, [currentPage, users])

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
                        />
                    )
                })
            }
            <Pagination
            currentpage={currentPage}
            setCurrentPage={changeCurrentPage}
            perPage={perPage}
            totalAmount={users.length}
            />
        </Fragment>
    )
}



export default ParticipationList;