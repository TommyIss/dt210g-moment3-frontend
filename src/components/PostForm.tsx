import React, { useEffect, useState } from "react";
import type { Post } from "../Pages/PostsPage";
import * as Yup from 'yup';

interface PostFormProps {
    createPost: (post: { title: string; content: string }) => Promise<boolean>;
    updatePost: (id: number, post: { title: string; content: string }) => Promise<boolean>;
    setFormType?: (type: string | null) => void;
    formType?: 'create' | 'update';
    initialPost: Post | null;
}

interface ErrorPost {
    title?: string;
    content?: string;
}

function PostForm({ createPost, setFormType, updatePost, formType, initialPost}: PostFormProps) {

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    
    const [errors, setErrors] = useState<ErrorPost>({});

    const validationSchema = Yup.object({
        title: Yup.string().required('Fyll i inläggstitel').min(3, 'Titeln måste vara minst 3 tecken lång'),
        content: Yup.string().required('Fyll i inläggsinnehåll').min(6, 'Innehållet skall vara minst 6 tecken lång')
    });

    useEffect(() => {
        if(formType === 'update' && initialPost) {
            setFormData({
                title: initialPost.title,
                content: initialPost.content
            })
        }
    }, [formType, initialPost])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault();

        let success = false;

        try {
            await validationSchema.validate(formData, { abortEarly: false});
            if(formType === 'create') {
                success = await createPost(formData);
            }
            
            if(formType === 'update' && initialPost) {
                success = await updatePost(initialPost.id, formData);
            }

            if(setFormType && success) {
                setFormType(null);
            }
        } catch (errors) {
            const validatiosErrors: ErrorPost = {};

            if(errors instanceof Yup.ValidationError) {
                errors.inner.forEach((error) => {
                    const prop = error.path as keyof ErrorPost;

                    validatiosErrors[prop] = error.message;
                });
            }

            setErrors(validatiosErrors);
        }
        
    }

    return(
        <fieldset>
            <legend>
                {formType === 'create' ? 'Skapa nytt inlägg': 'Redigera inlägg'}
            </legend>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titel:</label>
                <input type="text" 
                    value={formData.title}
                    onChange={(event) => {
                        setFormData({ ...formData, title: event.target.value})
                    }} />
                {errors.title && <span style={{ color: 'red', marginLeft: '5px'}}>{errors.title}</span>}
                <br />

                <label htmlFor="content">Innehåll:</label>
                <textarea name="contetn" id="content"
                    value={formData.content}
                    onChange={(event) => {
                        setFormData({ ...formData, content: event.target.value})
                    }}
                ></textarea>
                {errors.content && <span style={{ color: 'red', marginLeft: '5px'}}>{errors.content}</span>}
                <br />

                {
                    setFormType && (
                        <>
                            <button type="submit">
                                {formType === 'create' ? 'Skapa' : 'Spara'}
                            </button>
                            <button type="button" onClick={() => setFormType(null)}>Avbryt</button>
                        </>
                    )
                }
            </form>
        </fieldset>
    )
}

export default PostForm;