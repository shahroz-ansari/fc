import React, { useEffect, useCallback, useState } from 'react';
import style from './addMember.module.css';

import Member from '../../core/member';
import { tabsState, headerState } from '../../../store/layout';
import { isEmail } from '../../../utils/validate';
import { searchUser } from '../../../services/server';
import { _getGroup } from '../../../services/local';
import { useParams } from 'react-router-dom';

function AddMember() {
    const { groupId } = useParams();
    const [ username, setUsername] = useState('')
    const [ userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const tabsPrevState = tabsState.value;
        const headerPrevState = headerState.value;

        (async function() {
            const group = await _getGroup(groupId);
            const title = (group && group.title) || 'Group Name'
            tabsState.next({...tabsPrevState, show: false})
            headerState.next({
                ...headerPrevState,
                logo: false,
                text: title,
                subText: 'Add new member',
                goBack: true
            })
        })()
        return () => {
            tabsState.next(tabsPrevState);
            headerState.next(headerPrevState);
        }
    }, [groupId])

    const handleSearch = useCallback(async () => {
        if (!isEmail(username)) {
            return;
        }
        try {
            const userResponse = await searchUser(username);
            if (userResponse.success) {
                setUserInfo(userResponse.data)
                return;
            }
        } catch(error) {
            setUserInfo(null);
        }
    }, [username]);

    return (
        <div className={style.container}>
            <form onSubmit={ e => { e.preventDefault(); handleSearch()}} className={style.formContainer}>
                <input type='search'
                    className={style.input}
                    placeholder='Search'
                    value={username}
                    onChange={ e => setUsername(e.target.value)}
                />
                <button type="submit" className={style.button}>Search</button>
            </form>
            { 
                userInfo &&
                <Member 
                    picture={userInfo.picture}
                    name={(userInfo.firstName || '') + ' ' + (userInfo.lastName || '')}
                    status={0}
                    // handleAdd={handleAdd}
                />
            }
        </div>
    )
}

export default AddMember;