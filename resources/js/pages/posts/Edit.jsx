import { useForm } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import './Edit.css';

export default function Edit({ post }) {
    const { data, setData, put, errors, processing } = useForm({
        contenu: post.contenu || '',
        image: null,
        utilisateur_id: post.utilisateur_id || '',
    });

    const [preview, setPreview] = useState(post.image ? `/${post.image}` : null);

    function submit(e) {
        e.preventDefault();
        put(`/posts/${post.id}`, {
            forceFormData: true,
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(post.image ? `/${post.image}` : null);
        }
    };

    return (
        <div className="edit-container">
            <h1 className="edit-title">Modifier la publication</h1>
            
            <form onSubmit={submit} encType="multipart/form-data" className="edit-form">
                <textarea
                    name="contenu"
                    value={data.contenu}
                    onChange={(e) => setData('contenu', e.target.value)}
                    placeholder="Exprimez-vous..."
                    className="edit-textarea"
                />
                {errors.contenu && <div className="edit-error">{errors.contenu}</div>}

                {preview && (
                    <div className="edit-image-preview">
                        <img src={preview} alt="Preview" className="edit-preview-image" />
                    </div>
                )}

                <div className="edit-file-upload">
                    <label className="edit-file-upload-label">
                        <svg viewBox="0 0 24 24" className="edit-upload-icon">
                            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                        </svg>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="edit-file-input"
                        />
                    </label>
                </div>
                {errors.image && <div className="edit-error">{errors.image}</div>}

                <div className="edit-button-container">
                    <button type="submit" disabled={processing || !data.contenu.trim()} className="edit-submit-btn">
                        {processing ? "Mise à jour..." : "Mettre à jour"}
                    </button>
                </div>
            </form>
        </div>
    );
}
