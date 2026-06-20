import { Link } from "react-router-dom";

interface PostArticleProps {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    author: { 
        id: number;
        firstname: string;
        lastname: string;
    }
}


function PostArticle({id, title, author}: PostArticleProps) {
    return(
        <article key={id}>
            <h3>
                <Link className="postTitles" to={`/posts/${id}`}>{title}</Link>
            </h3>
            
            <Link className="showContentLinks" to={`/posts/${id}`}>Visa innehåll</Link>
            <p>
                Skrivs av: {author.firstname} {author.lastname}
            </p>
            
        </article>
    )
}

export default PostArticle;