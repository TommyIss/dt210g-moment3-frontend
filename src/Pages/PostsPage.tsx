import { useEffect, useState } from "react";
import PostArticle from "../components/PostArticle";
import PostForm from "../components/PostForm";
import Notification from "../components/Notification";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Breadcrumbs from "../components/Breadcrumbs";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: {
        id: number;
        firstname: string;
        lastname: string;
    };
    created_at: string;
    updated_at: string;
}

function PostsPage() {


    const url = 'https://tois-dt210g-moment3-backend.onrender.com/posts';
    const token = localStorage.getItem('token');
    const [ posts, setPosts] = useState<Post[]>([]);
    const [ formType, setFormType] = useState<string | null>(null);
    const [ notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error'
    } | null>(null);
    const uniqueAuthors = Array.from(
        new Map(posts.map(post => [post.author.id, post.author])).values()
    );
    const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null);
    const filtredPosts = selectedAuthor ? posts.filter(post => post.author.id === selectedAuthor) : posts;
    const location = useLocation();
    const {user} = useAuth();

    useEffect(() => {
        getPosts();
        localStorage.setItem('pathname', location.pathname);
    }, [])

    function showNotification(message: string, type: 'success' | 'error' = 'success') {
        setNotification({message, type});
        setTimeout(() => {
            setNotification(null)
        }, 3000);
    }

    async function getPosts() {
        try {
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.ok) {
                const data = await response.json();
                setPosts(data);
                
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function createPost(newPost: { title: string, content: string}) {
        try {
            if(!newPost.title || newPost.title === '') {
                showNotification('Du måste ange titel', 'error');
                return false;
            }
            if(!newPost.content || newPost.content === '') {
                showNotification('Du måste skriva innehåll', 'error');
                return false;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newPost.title,
                    content: newPost.content
                })
            });

            if(!response.ok) {
                const errData = await response.json();
                showNotification(errData.message || 'Kunde inte skapa inlägg', 'error');
                return false;
            }

            getPosts();

            showNotification('Inlägget skapades', 'success');
            return true;
        } catch (error) {
            console.error(error);
            showNotification('Ett förväntat fel uppstod', 'error');
            return false;
        }
    }

    return (
        <div>
            <Breadcrumbs 
                pageLabel="Alla inlägg"
            />

            <h2>Inlägg</h2>

            {
                notification && <Notification 
                message={notification.message}
                type={notification.type}
                />
            }

            {   user &&
                <button type="button" onClick={() => setFormType('create')}>Skapa nytt inlägg</button>
            }

            {formType === 'create' && (
                <PostForm 
                    formType="create"
                    createPost={createPost}
                    updatePost={async() => false}
                    initialPost={null}
                    setFormType={setFormType}
                />)
            }

            <hr />
            <label htmlFor="author">Välj författare:</label>
            <select 
            name="author" 
            id="author"
            value={selectedAuthor ?? ''}
            onChange={(e) => setSelectedAuthor(Number(e.target.value))}
            >
                <option value="">Alla</option>
                {
                    uniqueAuthors.map((author) => 

                        <option key={author.id} value={author.id}>{author.firstname} {author.lastname}</option>
                    )
                }
            </select>
            <hr />
            <span>Visar {filtredPosts.length} av {posts.length}</span>
            <div className="flex-container">
                {
                    filtredPosts.length === 0 && <p>Inga inlägg har lagts till</p>
                }
                {
                    filtredPosts.map((post) => 
                        <PostArticle 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            content={post.content}
                            created_at={post.created_at}
                            updated_at={post.updated_at}
                        />
                    )
                }
            </div>

        </div>
    )
}

export default PostsPage;