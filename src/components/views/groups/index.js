import React from 'react';
import ListItem from '../../core/listItem';
import AddButton from '../../core/svgIcons/addButton';

import Style from './groups.module.css';

function GroupsView(params) {
    return (
        <>
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
            <AddButton style={Style.add_button} width={60} height={60} fill={"#009688"} />
        </>
    )
}

export default GroupsView;