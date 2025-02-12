import { Link, useForm } from "@inertiajs/react";

export default function Show({ post, comments }) {
    const { data, setData, post: submit, errors } = useForm({
        contenu: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(
            "/posts/" + post.id + "/comments", // This route will handle creating the comment
            {
                method: "post",
                data,
                onSuccess: () => setData({ contenu: "" }), // Reset the form
            }
        );
    };

    return (
        <div>
            <h1>Commentaires pour : {post.contenu}</h1>
            <img src={`/${post.image}`} alt={post.contenu} width="100" />

            <ul>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.id}>
                            <p>
                                <strong>{comment.utilisateur.nom} {comment.utilisateur.prenom}</strong>: {comment.contenu}
                            </p>
                        </li>
                    ))
                ) : (
                    <p>Aucun commentaire pour ce post.</p>
                )}
            </ul>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="contenu">Ajouter un commentaire:</label>
                    <textarea
                        id="contenu"
                        name="contenu"
                        value={data.contenu}
                        onChange={(e) => setData("contenu", e.target.value)}
                    />
                    {errors.contenu && <p className="error">{errors.contenu}</p>}
                </div>

                <button type="submit">Soumettre</button>
            </form>

            <Link href="/dashboard" className="btn">Retour à l'accueil</Link>
        </div>
    );
}
