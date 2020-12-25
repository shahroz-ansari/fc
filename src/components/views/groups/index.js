import React from 'react';
import ListItem from '../../core/listItem';

import Style from './groups.module.css';

function GroupsView(params) {
    return (
        <div className={Style.groups_view}>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    )
}

export default GroupsView;