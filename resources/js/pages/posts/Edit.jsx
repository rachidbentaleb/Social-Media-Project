import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ post }) { 
    const { data, setData, post: submitForm, errors, processing } = useForm({
        _method: 'put',
        contenu: post.contenu,
        image: null, 
    });

    function submit(e) {
        e.preventDefault();
        submitForm(`/posts/${post.id}`, { 
            forceFormData: true,
        });
    }

    return (
        <div>
            <h1>Edit Post</h1>

            <form onSubmit={submit} encType="multipart/form-data">
                <label htmlFor="contenu">Contenu:</label>
                <br />
                <textarea
                    name="contenu"
                    value={data.contenu}
                    onChange={(e) => setData('contenu', e.target.value)}
                />
                {errors.contenu && <div className="error">{errors.contenu}</div>}

                <br />
                <br />

                {post.image && (
                    <img src={`/${post.image}`} alt={post.contenu} width="100" />
                )}
                <br />
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setData('image', e.target.files[0])}
                />
                {errors.image && <div className="error">{errors.image}</div>}

                <br />

                <button type="submit" disabled={processing}>
                    Update Post
                </button>
            </form>
        </div>
    );
}
