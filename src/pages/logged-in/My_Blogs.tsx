import '../../style.css'
import { useEffect, useState } from 'react';
import { useGetMyBlogQuery } from '../../services/api.ts';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { supabase } from '../../supabaseClient.ts';

const My_Blogs: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { data: blog, error: queryError, isLoading } = useGetMyBlogQuery();

    function viewBlog(blog_id: number) {
      sessionStorage.setItem('viewBlogId', blog_id.toString());
      window.location.href = '/Blog';
    }

    function editBlog(blog_id: number, blog_header: string, blog_body: string) {
      sessionStorage.setItem('editBlogId', blog_id.toString());
      sessionStorage.setItem('editBlogHeader', blog_header);
      sessionStorage.setItem('editBlogBody', blog_body);
      window.location.href = '/blogeditor';
    }

    async function deleteBlog(blog_id: number) {
      await supabase
        .from('blogs_table')
        .delete()
        .eq('blog_id', blog_id)
        .single();
      window.location.href = '/myblogs';
    }

    useEffect(() => {
      const user_id_str = sessionStorage.getItem('currentUserId');
      if (!user_id_str) {
        setError('Missing user_id in session storage.');
      }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (queryError || error) return <div>Error loading blog</div>;

    return (
      <div className="My_Blogs">
        {blog?.map((blog) => (
          <div className="blog" key={blog.blog_id}>
            <a className='blog_header' onClick={() => viewBlog(blog.blog_id)}>{blog.blog_header}</a>
            <div className="row">
              <p className='blog_author'>By: {blog.author} ({blog.created_at})</p>
            </div>
            <p className='truncate-multiline'>{blog.blog_body}</p>
            <div className='ed-del'>
              <a className='edit' onClick={() => blog.blog_header && blog.blog_body && editBlog(blog.blog_id, blog.blog_header || '', blog.blog_body || '')}><Pencil /> Edit</a>
              <a className='delete' onClick={() => deleteBlog(blog.blog_id)}><Trash /> Delete</a>
            </div>
          </div>
        ))}
      </div>
    );
};

export default My_Blogs