import React, { useEffect, useState } from 'react'
import style from './profile.module.css'
import { useAuth } from "../../hooks/useAuth"
import { usePosts } from "../../hooks/usePosts"

const Profile = () => {
  const {user, updateUser} = useAuth()
  const {posts, deletePost} = usePosts();
  const [uPost, setUPost] = useState(null);

  const handleDP = (e) => {
    const dp = e.target.files[0];
    console.log(dp)
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

  useEffect(()=> {
    const filteredPost = posts.filter((post)=> {
      return post.author.id === user.id
    })

    if(filteredPost) {
      setUPost(filteredPost)
    }
  }, [])

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
        <h3>All Posts</h3>
        <div className={style.container}>
          {uPost?.map((post)=> (
            <div className={style.userpost}>
                <p>{post.text}</p>
                {post.image && <div className={style.imgWrap}><img src={post.image} alt="" /></div>}
                <div className={style.btns}>
                  <button>Edit</button>
                  <button onClick={()=> deletePost(post.id)}>Delete</button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
