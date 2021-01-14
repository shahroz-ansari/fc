import React, { useEffect } from 'react';
import style from './addMember.module.css';

import Member from '../../core/member';
import { tabsState, headerState } from '../../../store/layout';
// import { useParams } from 'react-router-dom';

function AddMember() {
    // const { groupId } = useParams();

    useEffect(() => {
        const tabsPrevState = tabsState.value;
        const headerPrevState = headerState.value;

        // get groupTitle by groupId
        tabsState.next({...tabsPrevState, show: false})
        headerState.next({...headerPrevState, logo: false, text: 'Group Title', subText: 'Add new member', goBack: true})
        return () => {
            tabsState.next(tabsPrevState);
            headerState.next(headerPrevState);
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.input_Box}>
                <input type='text' className={style.input} placeholder='Search' />
                <button className={style.button}>Search</button>
            </div>
            <Member />
        </div>
    )
}

export default AddMember;