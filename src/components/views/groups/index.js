import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';


import Style from './groups.module.css';

import AddButton from '../../core/svgIcons/addButton';
import GroupItem from '../../core/groupItem';
import { syncUpdateGroups } from '../../../store/db';
import { _getGroups } from '../../../services/local';

function GroupsView() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        const onGroupsUpdate = async () => {
            const groups = await _getGroups()
            if (groups) {
                console.log(groups)
                setGroups(groups)
            }
        }
        const subscription = syncUpdateGroups.subscribe(onGroupsUpdate)

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <Fragment>
            <div className={Style.groups_view}>
                {
                    groups.map( group => 
                        <GroupItem 
                            key={group._id}
                            picture={group.picture || (group._attachments && group._attachments.picture)}
                            title={group.title}
                            lastMessage={''}
                            unreadCount={0}
                        />
                    )
                }
            </div>
            <Link to="/groups/create">
                <AddButton style={Style.add_button} width={60} height={60} fill={"#009688"} />
            </Link>
        </Fragment>
    )
}

export default GroupsView;