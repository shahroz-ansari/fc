import React from 'react';
import style from './addMember.module.css';

import Member from '../../core/member';

function AddMember() {
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