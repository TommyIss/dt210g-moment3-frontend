import { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import type { Post } from "./PostsPage";
import Notification from "../components/Notification";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";
import Breadcrumbs from "../components/Breadcrumbs";


function PostDetailsPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [formType, setFormType] = useState<string | null>(null);
    const url = 'https://tois-dt210g-moment3-backend.onrender.com/posts/';
    const token = localStorage.getItem('token');
    const [ notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error'
    } | null>(null);
    const navigate = useNavigate();
    const {user} = useAuth();
    const location = useLocation();

    function showNotification(message: string, type: 'success' | 'error' = 'success') {
        setNotification({message, type});
        setTimeout(() => {
            setNotification(null)
        }, 3000);
    }

    useEffect(() => {
        getPostDetails(Number(id));
        localStorage.setItem('pathname', location.pathname);
    }, [id])

    async function getPostDetails(id: number) {
        try {
            
            const response = await fetch(url + id, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) {
                showNotification('Ett fel vid hämtning av inläggsdetaljer', 'error');
                return;
            }

            const data = await response.json();
            
            setPost(data);
        } catch (error) {
            console.error(error);
            showNotification('Oväntat fel vid hämtning av data!', 'error');
        }
    }

    async function updatePost(id: number, post: {title: string, content: string}) {
        try {
            if(!post.title || post.title === '') {
                showNotification('Du måste ange titel', 'error');
                return false;
            }
            if(!post.content || post.content === '') {
                showNotification('Du måste skriva innehåll', 'error');
                return false;
            }

            const response = await fetch(url + id, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(post)
            });

            if(!response.ok) {
                showNotification('Ett fel vid uppdatering av inläggsdetaljer', 'error');
                return false;
            }

            
            getPostDetails(id);
            showNotification('Inlägget har uppdaterats', 'success');
            return true;
        } catch (error) {
            console.error(error);
            showNotification('Oväntat fel vid uppdatering av inlägg!', 'error');
            return false;
        }
    }

    async function deletePost(id: number) {
        try {
            const confirmed = window.confirm('Är du säker att du vill radera inlägget?');
            if(!confirmed) return;

            const response = await fetch(url + id, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if(!response.ok) {
                showNotification('Ett fel vid radering av inlägg', 'error');
                return;
            }

            showNotification('Inlägget har raderats');
            setTimeout(() => {
                navigate('/posts');
            }, 1500);
        } catch (error) {
            console.error(error);
            showNotification('Oväntat fel vid uppdatering av inlägg!', 'error');
        }
    }

    if (!post) return <p>Laddar...</p>;

    return(
        <section>
            
            {
                notification && <Notification 
                message={notification.message}
                type={notification.type}
                />
            }

            {formType === 'update' ? (
                <PostForm 
                    formType={"update"}
                    createPost={async () => false}
                    updatePost={updatePost}
                    initialPost={post}
                    setFormType={setFormType}
                />
            ) : (
                <>
                    <Breadcrumbs  
                    pageLabel="Alla inlägg"
                    itemLabel={post.title}
                    />
                    <h3>{post.title}</h3>
            
                    <p>Innehåll: {post.content}</p>
                    <p>
                        Skapad av: {post.author.firstname} {post.author.lastname}
                    </p>
                    
                    <span>
                        Skapat: {new Date(post.created_at).toLocaleDateString('se-SE', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                    </span>
                    <br />
                    <span>
                        Uppdaterat: {
                            new Date(post.updated_at).toLocaleDateString('se-SE', {
                                year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
                            })
                        }
                    </span>
                    
                    {   (user && (user.role === 'admin' || Number(user.id) === Number((post.author as any).id)) ) &&
                        (<div>
                            <button type="button" onClick={() => setFormType('update')}>Ändra</button>
                            <button type="button" onClick={() => deletePost(post.id)}>Radera</button>
                        </div>)
                    }
                </>
            )}
            
        </section>
    )
}

export default PostDetailsPage;