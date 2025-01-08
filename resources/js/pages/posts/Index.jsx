import { Link, useForm } from "@inertiajs/react";

export default function Index({ posts }) {
    const { delete: destroy } = useForm();

    function submit(e, postId) {
        e.preventDefault();
        
        if (confirm("Are you sure you want to delete this post?")) {
            console.log("Deleting post with ID:", postId);  // Debug log to check postId
            
            // Explicitly ensure the method is DELETE
            destroy(`/posts/${postId}`, {
                method: 'delete'
            });
        }
    }
    

    return (
        <>
            <h1>Mes Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.contenu}</h2>
                        <p>{new Date(post.created_at).toLocaleTimeString()}</p>
                        {post.image && (
                            <img src={`/${post.image}`} alt={post.contenu} width="100" />
                        )}
                        <br />
                        <button>
                            <Link href={`/posts/${post.id}/edit`}>Edit Post</Link>
                        </button>
                        <form onSubmit={(e) => submit(e, post.id)}>
                            <button type="submit">Delete</button>
                        </form>
                        <br />
                    </li>
                ))}
            </ul>
        </>
    );
}
