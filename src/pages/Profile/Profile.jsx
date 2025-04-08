import React, { useEffect, useState } from 'react'
import style from './profile.module.css'
import { useAuth } from "../../hooks/useAuth"
import { usePosts } from "../../hooks/usePosts"

const Profile = () => {
  const {user, updateUser} = useAuth()
  const {posts, updatePost, deletePost} = usePosts();
  const [uPost, setUPost] = useState(null);
  const [editPost, setEditPost] = useState({});
  const [activePopup, setActivePopup] = useState(false);

  const handleDP = (e) => {
    const dp = e.target.files[0];
    if(dp) {
      const reader = new FileReader();
      reader.readAsDataURL(dp);
      reader.onloadend = () => {
        const nUser = {
          ...user,
          avatar: reader.result
        }
        updateUser(nUser)
    }
    }
  }

  const removeDP = () => {
    const nUser = {
      ...user,
      avatar: ''
    }
    updateUser(nUser)
  }

  const handleEditPost = (post) => {
    setActivePopup(true);
    setEditPost(post);
  }

  const handleImage = (e) => {
    const image = e.target.files[0]
    if(image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            setEditPost((prev) => (
                {...prev, image: reader.result}
            ));  
        }
    }
}

const handleText = (e) => {
    const value = e.target.value;
    setEditPost((prev)=> (
        {...prev, text: value}
    ))
}

const handleImagePrev = () => {
  setEditPost((prev)=> (
    {...prev, image: ''}
  ))
}

const handleUpdatePost = () => {
  setActivePopup(false);
  updatePost(editPost);
}

  useEffect(()=> {
    const filteredPost = posts.filter((post)=> {
      return post.author.id === user.id
    })

    if(filteredPost) {
      setUPost(filteredPost)
    }
  }, [posts])


  return (
    <div className={style.profilePage}>
      <div className={style.userProfile}>
      {user.avatar ? <div className={style.dp}>
        <img src={user.avatar} />
        <span className={style.overlay} title="Remove DP" onClick={removeDP}>
        <i className={`fa-solid fa-trash ${style.icon}`}></i>
        </span>
      </div>
      :
      <label htmlFor="dp" title="Upload DP">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
        <input type="file" name="avatar" id="dp" accept="image/*" hidden onChange={handleDP}/>
      </label> 
        
      }
      <h2 className={style.name}>{user.name}</h2>
      <p className={style.email}>{user.email}</p>
      </div>
      <div className={style.userPosts}>
        <h3>Your Posts</h3>
        <div className={style.container}>
          {uPost?.map((post)=> (
            <div className={style.userpost}>
                <p>{post.text}</p>
                {post.image ? <div className={style.imgWrap}><img src={post.image} alt="" /></div> :
                <div className={style.imgWrap}><img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="" /></div>
                }
                <div className={style.btns}>
                  <button onClick={()=> handleEditPost(post)}>Edit</button>
                  <button onClick={()=> deletePost(post.id)}>Delete</button>
                </div>
            </div>
          ))}
        </div>
      </div>
      {activePopup && <div className={style.popContainer} >
        <div className={style.popupOverlay} onClick={()=> setActivePopup(false)}></div>
        <div className={style.popupModal}>
                  <h2>Edit Post</h2>
                <form className={style.form}>
                    <textarea type="text" name="text" value={editPost.text} placeholder={`What's on your mind, ${user.name}?`} onChange={handleText}></textarea>
                    {editPost?.image ? 
                    <div className={style.uploadImg}>
                        <div className={style.previewContainer}>
                            <img src={editPost?.image} alt="Placeholder Image" />
                            <button className={style.removeImg} onClick={handleImagePrev}><i class="fa-solid fa-xmark"></i></button>
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
                <button  className={style.postBtn} onClick={handleUpdatePost}>Update</button>
              </div>
      </div>}
    </div>
  )
}

export default Profile
