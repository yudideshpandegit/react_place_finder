import React, {useRef, useState, useEffect} from 'react';

import './Images.css';

const ImagesUpload = Props => {

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [fileValid, setFileValid] = useState(false);

    const forImagePicker = useRef();

    useEffect(() => {

        if(!file){
            return;
        }

        let fileReader = new FileReader();

        fileReader.onload = () => {
            setFileUrl(fileReader.result);
        }

        fileReader.readAsDataURL(file)

    }, [file])


    const pickHandler = (e) => {

        if(e.target.files && e.target.files.length == 1){
            console.log(e.target.files);
            setFile(e.target.files[0]);
            setFileValid(true);
            Props.onInput(e,e.target.files[0]);
        }
        else{
            setFileValid(false);
        }

    }


    const pickImageHandler = () => {
        forImagePicker.current.click();
    }

    return (

        <div className='image-upload'>

            <input
                type='file'
                ref = {forImagePicker}
                style={{ display: "none" }}
                onChange={pickHandler}
            />

            <div className='image-upload__prev'>
                <img src = {fileUrl} title = "Image Preview" className = 'image-upload__prev__image' />
            </div>

            <button type = 'button' className = 'btn btn-primary image-upload__button' onClick = {pickImageHandler}>Select File</button>
        </div>


    )

}

export default ImagesUpload;