import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../style.css'

const Blog: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [blog_header, setBlogHeader] = useState<string>('');
  const [blog_body, setBlogBody] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [created_at, setCreatedAt] = useState<string>('');

  useEffect(() => {
    const profileSelect = async () => {
      const blog_id_str = sessionStorage.getItem('viewBlogId');
      if (!blog_id_str) {
        setError('Missing blog_id in session storage.');
        return;
      }
      const blog_id: number = parseInt(blog_id_str, 10)
      const { data, error: queryError } = await supabase
        .from('blogs_table')
        .select('*')
        .eq('blog_id', blog_id)
        .single();
      
      if (queryError) {
        setError('Selection failed: ' + queryError.message);
      } else if (data) {
        setError(null);
        setBlogHeader(data.blog_header || '');
        setBlogBody(data.blog_body || '');
        setAuthor(data.author || '');
        setCreatedAt(data.created_at || '');
        // Use the retrieved data as needed
        console.log('Blog Details:', { blog_id: data.blog_id, blog_header: data.blog_header, blog_body: data.blog_body, author: data.author, created_at: data.created_at });
      }
    };
    profileSelect();
  }, []);
  return (
    <div className="Blog">
      <h1 className="view_blog_header">{blog_header}</h1>
      <div className="blog">
        <div className="blog-details">
          <p className="view_blog_author">Author: <span className="blog_item_detail">{author}</span></p>
          <p className="view_blog_date">Created At: <span className="blog_item_detail">{created_at}</span></p>
        </div>
        <p className="blog_body">{blog_body}</p>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Blog