import React from 'react';
import { useForm } from "@inertiajs/react";
import './Edit.css'; // We'll create this next

export default function Edit({ utilisateur }) {
    const { data, setData, post, errors, processing } = useForm({
        _method: 'put',
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        mdp: '',
        mdp_confirmation: '',
        bio: utilisateur.bio,
        photodeprofile: null,
    });

    function submit(e) {
        e.preventDefault();
        post(`/utilisateurs/${utilisateur.id}`, {
            preserveScroll: true,
        });
    }

    return (
        <div className="edit-container">
            <h1 className="edit-title">Modifier votre profil</h1>
            <form onSubmit={submit} encType="multipart/form-data" className="edit-form">
                {[
                    { label: 'Nom', name: 'nom', type: 'text', value: data.nom },
                    { label: 'Prénom', name: 'prenom', type: 'text', value: data.prenom },
                    { label: 'Email', name: 'email', type: 'email', value: data.email },
                    { label: 'Mot de passe', name: 'mdp', type: 'password', value: data.mdp },
                    { label: 'Confirmer mot de passe', name: 'mdp_confirmation', type: 'password', value: data.mdp_confirmation },
                ].map(({ label, name, type, value }) => (
                    <div key={name} className="edit-field">
                        <label htmlFor={name}>{label}:</label>
                        <input
                            id={name}
                            type={type}
                            value={value}
                            onChange={e => setData(name, e.target.value)}
                            className={errors[name] ? 'input-error' : ''}
                        />
                        {errors[name] && <p className="error-message">{errors[name]}</p>}
                    </div>
                ))}

                <div className="edit-field">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        rows="6"
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        className={errors.bio ? 'input-error' : ''}
                    />
                    {errors.bio && <p className="error-message">{errors.bio}</p>}
                </div>

                <div className="edit-field">
                    <label>Photo de profil actuelle:</label>
                    {utilisateur.photodeprofile ? (
                        <img
                            src={`/${utilisateur.photodeprofile}`}
                            alt="Profile"
                            className="profile-preview"
                        />
                    ) : (
                        <p className="no-photo">Aucune photo de profil</p>
                    )}
                </div>

                <div className="edit-field">
                    <label htmlFor="photodeprofile" className="file-label">
                        Choisir une nouvelle photo
                        <input
                            id="photodeprofile"
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                const file = e.target.files[0];
                                if (file) setData('photodeprofile', file);
                            }}
                            className="file-input"
                        />
                    </label>
                    {errors.photodeprofile && <p className="error-message">{errors.photodeprofile}</p>}
                </div>

                <button type="submit" className="edit-submit" disabled={processing}>
                    {processing ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
            </form>
        </div>
    );
}
