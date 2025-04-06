import React, { useState } from 'react'
import style from './newpost.module.css'
import {v4 as uuid} from 'uuid'
import { useAuth } from "../../hooks/useAuth"
import { usePosts } from "../../hooks/usePosts"

const NewPost = () => {
    const {user} = useAuth()
    const {addPost, loading} = usePosts()
    const [content, setContent] = useState({
        id: uuid(),
        text: '',
        image: ''
    })
    const [preview, setPreview] = useState('')

    const handlePreview = () => {
        setPreview('');
        setContent((prev)=> (
            {...prev, image: ''}
        ))
    }

    const handleImage = (e) => {
        const image = e.target.files[0]
        if(image) {
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onloadend = () => {
                setContent((prev) => (
                    {...prev, image: reader.result}
                ));
                setPreview(reader.result);
            }
        }
    }

    const handleText = (e) => {
        const value = e.target.value;
        setContent((prev)=> (
            {...prev, text: value}
        ))
    }

    const handlePost = () => {
        const newPost = {
            ...content,
            author: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            },
            likes: [],
            comments: [],
            createdAt: new Date()
        }
        addPost(newPost)
    }

  return (
    <div className={style.createPostContainer}>
      <h2>Create Post</h2>
      <div className={style.container}>
        <form className={style.form}>
            <textarea type="text" name="text" value={content.text} onChange={handleText} placeholder={`What's on your mind, ${user.name}?`}></textarea>
            {preview ? 
            <div className={style.uploadImg}>
                <div className={style.previewContainer}>
                    <img src={preview} alt="Placeholder Image" />
                    <button className={style.removeImg} onClick={handlePreview}><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        :
        <label htmlFor="img">
            <div className={style.uploadImg}>
                <div className={style.imgContainer}>
                    <div className={style.addPhotos}>
                        <i class="fa-solid fa-image"></i>
                        <p>Add Photo</p>
                    </div>
                </div>
            </div>
            <input type="file" id="img" name="image" hidden accept="image/*" onChange={handleImage}/>
            </label>    
        }

        </form>
        <button onClick={handlePost} className={style.postBtn} disabled={loading}>Post</button>
      </div>
    </div>
  )
}

export default NewPost
