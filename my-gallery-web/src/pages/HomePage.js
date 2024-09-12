import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures it runs only on mount

    return (
        <div>
            <h2>Gallery</h2>
            {posts.length === 0 ? <p>No posts yet.</p> : (
                <div>
                    {posts.map(post => (
                        <div key={post._id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.image && <img src={`/${post.image}`} alt={post.title} style={{ maxWidth: '100%' }} />}
                            <p>Posted by: {post.user.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
