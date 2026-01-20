import { useGetBlogQuery } from '../services/api.ts';

const BlogList: React.FC = () => {
  const { data: blog, error, isLoading } = useGetBlogQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog</div>;

  function viewBlog(blog_id: number) {
    sessionStorage.setItem('viewBlogId', blog_id.toString());
    window.location.href = '/Blog';
  }

  return (
    <>
      {blog?.map((blog) => (
        <div className="blog" key={blog.blog_id}>
          <a className='blog_header' onClick={() => viewBlog(blog.blog_id)}>{blog.blog_header}</a>
          <div className="row">
            <p className='blog_author'>By: {blog.author} ({blog.created_at})</p>
          </div>
          <p className='truncate-multiline'>{blog.blog_body}</p>
        </div>
      ))}
    </>
  );
};

export default BlogList;
