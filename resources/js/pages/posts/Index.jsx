import { Link, useForm } from "@inertiajs/react";
import './Index.css';

export default function Index({ posts }) {
    const { delete: destroy } = useForm();

    const handleDelete = (e, postId) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this post?")) {
            destroy(`/posts/${postId}`, { method: 'delete' });
        }
    };

    return (
        <div className="index-container">
            <header className="index-header">
                <h1 className="index-title">Mes Posts</h1>
            </header>

            <div className="index-posts-list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.id} className="index-post-card">
                            <div className="index-post-content">
                                <p className="index-post-text">{post.contenu}</p>
                                <div className="index-post-meta">
                                    <time dateTime={post.created_at}>
                                        {new Date(post.created_at).toLocaleString()}
                                    </time>
                                </div>
                            </div>
                            
                            {post.image && (
                                <div className="index-post-media">
                                    <img 
                                        src={`/${post.image}`} 
                                        alt={post.contenu} 
                                        className="index-post-image"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            
                            <div className="index-post-actions">
                                <Link 
                                    href={`/posts/${post.id}/edit`} 
                                    className="index-btn index-btn-primary"
                                >
                                    Edit
                                </Link>
                                
                                <button 
                                    onClick={(e) => handleDelete(e, post.id)} 
                                    className="index-btn index-btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="index-empty-state">
                        <svg viewBox="0 0 24 24" className="index-empty-icon">
                            <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"/>
                        </svg>
                        <p className="index-empty-text">No posts yet. Create your first post!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
