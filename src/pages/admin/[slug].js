import { useRouter } from "next/router";
import AuthCheck from "../../../components/AuthCheck";
import { useState } from "react";
import { auth, firestore,serverTimestamp } from "../../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from '../../styles/Admin.module.css'
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import Link from "next/link";
import ImageUploard from "../../../components/ImageUploader";


export default function AdminPostsEdit({  })
{

    return (
        <main>
            <AuthCheck>
                <PostManager />
            </AuthCheck>
        </main>
    )
}

function PostManager()
{
    const [ preview, setPreview ] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug)
    const [post] = useDocumentData(postRef)


    return (
        <main className={styles.container} >
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <p>ID: {post.slug}</p>

                        <PostForm postRef={postRef} defaultValues={post} preview={preview} />
                    </section>

                    <aside>
                        <h3>Tools</h3>
                        <button onClick={() => setPreview(!preview)}> { preview ? 'Edit' : 'Preview' } </button>
                        <Link href={`/${post.username}/${post.slug}`} >
                            <button className="btn-blue" > Live view </button>
                        </Link>
                    </aside>
                </>
            )}
        </main>
    )
}

function PostForm({ postRef, defaultValues, preview }){
   const { register, handleSubmit, reset, watch, formState, errors } = useForm({ defaultValues, mode: 'onChange' }) 

    const { isValid, isDirty } = formState

   const updatePost = async ({ content, published }) => {
    await postRef.update({
        content,
        published,
        updateAt: serverTimestamp()
    })

    reset({ content, published })
    toast.success('Post update down')
   }


    return (
        <form onSubmit={handleSubmit(updatePost)} >
            {preview && (
                <div className="card" >
                    <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
            )}

            <div className={preview ? styles.hidden : styles.controls} >

                <ImageUploard/>
                
                <textarea name="content" {...register('content', {
                    maxLength: { value: 20000, message: 'content is too long' },
                    minLength: { value: 10, message: 'content to short' },
                    required: { value: true, message: 'content is required' }
                })} > </textarea>

                { errors?.content && <p className="text-danger"> {errors.content.message} </p> }

                <fieldset>
                    <input className={styles.checkbox} name="published" type="checkbox" {...register('published')} />
                    <label> Published </label>
                </fieldset>

                <button type="submit" className="btn-green" disabled={!isDirty || !isValid} >
                    Save chances
                </button>

            </div>

        </form>
    )
}