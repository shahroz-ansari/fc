import React, { useState, useCallback, useRef } from 'react';
import Image from '../../core/svgIcons/image';
import Style from './createGroup.module.css';
import { _createGroup } from '../../../services/local';

function CreateGroup(props) {
    const [groupName, setGroupName] = useState('');
    const [file, setFile] = useState(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const fileRef = useRef();

    const handleChange = useCallback((event) => {
        const value = event.target.value
        setGroupName(value)
    }, [])

    const handleFile = useCallback((event) => {
        let file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setFile(file)
                setFilePreviewUrl(reader.result)
            }
    
            reader.readAsDataURL(file);
        }
    }, [])

    const handleFileChange = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const createNewGroup = async () => {
        const result = await _createGroup(groupName, file);
        result && props.history.push('/groups')
    }

    return (
        <div className={Style.create_group}>
            <input type='file'
                className={Style.fileInput}
                ref={fileRef}
                onChange={handleFile}
                accept="image/*"
            />
            <div className={Style.image_box} onClick={handleFileChange}>
                {
                    filePreviewUrl ?
                        <img src={filePreviewUrl} className={Style.imagePreview} alt='group-icon' />
                        :
                        <Image fill={'#777'} width={35} height={35} />
                }
            </div>
            <input type="text"
                className={Style.input}
                placeholder={`Enter group name`}
                value={groupName}
                onChange={handleChange}
            />
            <button className={Style.button} onClick={createNewGroup}>Create</button>
        </div>
    )
}

export default CreateGroup;