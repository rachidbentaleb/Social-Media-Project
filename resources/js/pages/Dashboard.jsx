import React from 'react';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import './Dashboard.css';

export default function Dashboard({ posts }) {
  const { user } = usePage().props;

  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          {user.photodeprofile && (
            <img
              src={`/${user.photodeprofile}`}
              alt={`${user.nom} ${user.prenom}`}
              className="profile-photo"
            />
          )}
          <h1>
            Bienvenue, <span className="user-name">{user.nom} {user.prenom}</span> !
          </h1>
        </div>

        <nav className="dashboard-nav">
          <Link href="/posts/create" className="nav-link">Ajouter un post</Link>
          <Link href={`/utilisateurs/${user.id}/edit`} className="nav-link">Modifier le profil</Link>
          <Link href="/posts" className="nav-link">Voir mes posts</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>
      </header>

      <main className="posts-section">
        <h2>Accueil</h2>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-header">
                {post.utilisateur.photodeprofile && (
                  <img
                    src={`/${post.utilisateur.photodeprofile}`}
                    alt={`${post.utilisateur.nom} ${post.utilisateur.prenom}`}
                    className="post-profile-photo"
                  />
                )}
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
