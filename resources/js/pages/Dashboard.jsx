import React from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from "@inertiajs/react";
import './Dashboard.css'; // Assuming you have a CSS file for styling

export default function Dashboard({ posts }) {
    const { user } = usePage().props;

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Bienvenue, {user.nom} {user.prenom} !</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link href="/posts/create">Ajouter un post</Link></li>
                        <li><Link href={`/utilisateurs/${user.id}/edit`}>Modifier le profil</Link></li>
                        <li><Link href="/posts">Voir mes posts</Link></li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>
            </header>

            <main className="posts-section">
                <h2>Mes Posts</h2>
                <ul className="posts-list">
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <div className="post-header">
                                <h3>{post.utilisateur.nom} {post.utilisateur.prenom}</h3>
                                <time dateTime={post.created_at}>
                                    {new Date(post.created_at).toLocaleString()}
                                </time>
                            </div>
                            <p className="post-content">{post.contenu}</p>
                            {post.image && (
                                <img
                                    src={`/${post.image}`}
                                    alt={`Image pour le post: ${post.contenu}`}
                                    className="post-image"
                                />
                            )}
                            <Link href={`/posts/${post.id}/comments`} className="comments-link">
                                Voir les commentaires
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
