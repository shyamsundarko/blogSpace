import { useParams } from "react-router";
import useFetch from "../useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams();

    const {information: blog, isPending, error} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();
    const handleDelete = () => {

        fetch('http://localhost:8000/blogs/'+id, {
            method: 'DELETE'
        }).then(() =>{
            history.push('/');
        })
    }
    
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <h5>Written by: {blog.author}</h5>
                    <p>{blog.body}</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;