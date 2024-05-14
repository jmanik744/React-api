import { useState } from 'react';

function DeletePost() {
  const [postId, setPostId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setMessage('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Failed to delete post');
    }
  };

  return (
    <div>
      <h1>Delete Post</h1>
      <label>
        Post ID:
        <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} />
      </label>
      <button onClick={handleDelete}>Delete Post</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeletePost;

//Update Post
import { useState, useEffect } from 'react';

function UpdatePost() {
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, body };
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      setMessage('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage('Failed to update post');
    }
  };

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Post ID:
          <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} />
        </label>
        <br />
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePost;




//ADD POST fetch api
import { useState } from 'react';

function AddPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body };
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });
      if (!response.ok) {
        throw new Error('Failed to add post');
      }
      alert('Post added successfully');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;


// ALL posts API integration
import { useState, useEffect } from 'react';


function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h1>{post.id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPosts;


// Single Post fetch api
// ----------------------------------------
import { useState, useEffect } from 'react';

function SinglePost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, []);

  return (
    <div>
      <h1>Single Post</h1>
      {post ? (
        <div>
          <h1>{post.userId}</h1>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SinglePost;
