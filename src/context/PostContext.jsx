import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      }, []);
    
      const addPost = (newPost) => {
        setLoading(true)
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setLoading(false)
        navigate('/')
      };
    
      const updatePost = (updatedPost) => {
        const updatedPosts = posts.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
      };
    
      const deletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
      };

      const handleLikes = (postId) => {
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.map(post => {
            if (post.id !== postId) return post;
            
            const isLiked = post.likes.includes(user.id);
            const updatedLikes = isLiked
              ? post.likes.filter(id => id !== user.id)
              : [...post.likes, user.id];
            
            return {
              ...post,
              likes: updatedLikes,
            };
          });
    
          // Save to localStorage after state update
          localStorage.setItem('posts', JSON.stringify(updatedPosts))
          return updatedPosts;
        });

        
      }

    return (
        <PostContext.Provider value={{posts, addPost, updatePost, deletePost, handleLikes, loading}}>
            {children}
        </PostContext.Provider>
    )
}