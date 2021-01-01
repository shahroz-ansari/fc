import React from 'react';
import Image from '../../core/svgIcons/image';
import Style from './createGroup.module.css';

function CreateGroup() {

    return (
        <div className={Style.create_group}>
            <div className={Style.image_box}>
                <Image fill={'#777'} width={35} height={35} />
            </div>
            <input type="text"
                className={Style.input}
                placeholder={`Enter group name`} />
            <button className={Style.button}>Create</button>
        </div>
    )
}

export default CreateGroup;