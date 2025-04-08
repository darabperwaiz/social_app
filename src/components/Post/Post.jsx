import React, { useEffect, useState } from 'react'
import style from './post.module.css'
import { usePosts } from "../../hooks/usePosts";
import { useAuth } from "../../hooks/useAuth";

const Post = ({post}) => {
  const [isLiked, setIsliked] = useState(false);
  const [showComment, setShowComment] = useState(false)
    const date = new Date(post?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const {handleLikes} = usePosts()
    const {user} = useAuth();

    useEffect(()=> {
      setIsliked(user && post?.likes?.includes(user.id))
      console.log(isLiked)
    }, [post, user])

    const handleLike = () => {
      handleLikes(post.id)
    }
  return (
    <div className={style.post}>
              <div className={style.postTop}>
                {post?.author?.avatar ? <img className={style.userAvatar} src={post?.author?.avatar} /> :
                  <img className={style.userAvatar} src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                }
                <div className={style.userInfo}>
                  <p>{post?.author?.name}</p>
                  <p>{date}</p>
                </div>
              </div>
              <div className={style.postMid}>
                {post.text && <p>{post?.text}</p>}
                {post.image && (
                  <div className={style.postImg}>
                    <img src={post?.image} alt="" />
                  </div>
                )}
              </div>
              <div className={style.postBottom}>
                <div className={style.postBottomBtn}>
                  <button onClick={handleLike}>{isLiked ? <i className={`fa-solid fa-thumbs-up ${style.liked}`}></i>: <i className={`fa-solid fa-thumbs-up ${style.notLiked}`}></i>}{post?.likes?.length}</button>
                  <button onClick={()=> setShowComment(!showComment)}>Comment</button>
                </div>
                {showComment && <div className={style.postComments}>
                  comments
                </div>}
              </div>
            </div>
  )
}

export default Post
