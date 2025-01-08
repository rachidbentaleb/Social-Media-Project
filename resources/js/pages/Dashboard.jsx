import React from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia'; // Correct import
import { Link } from "@inertiajs/react";

export default function Dashboard({posts}) {
    const { user } = usePage().props;

    // Handle logout
    const handleLogout = () => {
        Inertia.post('/logout');
    };

    return (
        <div>
            <h1>Welcome, {user.id} - {user.nom} {user.prenom}!</h1>

            <nav>
                <ul>
                    <Link href='/posts/create'>Ajouter une post</Link>
                    <br /><br />
                    <Link href={`/utilisateurs/${user.id}/edit`}>Edit profile</Link>
                    <br /><br />
                    <Link href='/posts'>Voir mes posts</Link>
                </ul>
            </nav>

            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>Posted by: {post.utilisateur.nom} {post.utilisateur.prenom}</h3>
                        <p>{new Date(post.created_at).toLocaleTimeString()}</p>
                        <h2>{post.contenu}</h2>
                        {post.image && (
                            <img src={`/${post.image}`} alt={post.contenu} width="100" />
                        )}
                        <hr />
                        <br />
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
