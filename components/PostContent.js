import Link from "next/link"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export default function PostContent({ post })
{
    const createAt = typeof post?.createAt === "number" ? new Date(post.createAt) : post.createAt.toDate()

    return (
        <div className="card" >
            <h1> {post?.title} </h1>
            <span className="text-sm" >
                Written by { '' }
                <Link href={`/${post.username}`} >
                    <p className="text-info" > @{post.username} </p>
                </Link>
                on { createAt.toISOString() }
            </span>

            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    )
}