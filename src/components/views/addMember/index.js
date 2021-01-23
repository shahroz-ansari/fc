import React, { useEffect, useCallback, useState } from 'react';
import style from './addMember.module.css';

import Member from '../../core/member';
import { tabsState, headerState } from '../../../store/layout';
import { isEmail } from '../../../utils/validate';
import { searchUser, addMemberToGroup } from '../../../services/server';
import { _getGroup } from '../../../services/local';
import { useParams } from 'react-router-dom';
import { getFcData } from '../../../utils/ls';

function AddMember() {
    const { groupId } = useParams();
    const [username, setUsername] = useState('')
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const tabsPrevState = tabsState.value;
        const headerPrevState = headerState.value;

        (async function () {
            const group = await _getGroup(groupId);
            const title = (group && group.title) || 'Group Name'
            tabsState.next({ ...tabsPrevState, show: false })
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
        } catch (error) {
            setUserInfo(null);
        }
    }, [username]);

    const handleAdd = useCallback(async () => {
        try {
            const fcData = getFcData();
            if (!fcData) {
                console.log('fc data not found');
                return;
            }
            const { syncGatewayUser } = fcData;
            const { userFcId } = userInfo;
            if (!userFcId || !syncGatewayUser || !groupId) {
                console.log('fields required to add member are not missing');
                return;
            }
            const response = await addMemberToGroup(userFcId, groupId, syncGatewayUser)
            if (response.success) {
                setUserInfo({ ...userInfo, status: 1 });
            }
        } catch (err) {
            const errorCode = err?.response?.data?.error;
            if (errorCode === 'user_already_present_in_group' || errorCode === 'invitation_already_present') {
                setUserInfo({ ...userInfo, status: 1 });
            }
        }
    }, [userInfo, groupId])

    return (
        <div className={style.container}>
            <form onSubmit={e => { e.preventDefault(); handleSearch() }} className={style.formContainer}>
                <input type='search'
                    className={style.input}
                    placeholder='Search'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit" className={style.button}>Search</button>
            </form>
            {
                userInfo &&
                <Member
                    picture={userInfo.picture}
                    name={(userInfo.firstName || '') + ' ' + (userInfo.lastName || '')}
                    status={userInfo.status || 0}
                    handleAdd={handleAdd}
                />
            }
        </div>
    )
}

export default AddMember;