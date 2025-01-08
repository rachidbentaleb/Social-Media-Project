import React from 'react';
import { useForm } from "@inertiajs/react";

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
            onSuccess: () => console.log('Form submitted successfully'),
            onError: (errors) => console.log('Form submission errors', errors),
        });
    }

    return (
        <>
            <h1>Edit your profile</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    value={data.nom}
                    onChange={(e) => setData('nom', e.target.value)}
                />
                <br />
                {errors.nom && <div className="error">{errors.nom}</div>}
                <br />
                <label htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    value={data.prenom}
                    onChange={(e) => setData('prenom', e.target.value)}
                />
                <br />
                {errors.prenom && <div className="error">{errors.prenom}</div>}
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <br />
                {errors.email && <div className="error">{errors.email}</div>}
                <br />
                <label htmlFor="mdp">Mot de passe:</label>
                <input
                    type="password"
                    value={data.mdp}
                    onChange={(e) => setData('mdp', e.target.value)}
                />
                <br />
                {errors.mdp && <div className="error">{errors.mdp}</div>}
                <br />
                <label htmlFor="mdp_confirmation">Confirmer mot de passe:</label>
                <input
                    type="password"
                    value={data.mdp_confirmation}
                    onChange={(e) => setData('mdp_confirmation', e.target.value)}
                />
                <br />
                {errors.mdp_confirmation && <div className="error">{errors.mdp_confirmation}</div>}
                <br />
                <label htmlFor="bio">Bio:</label>
                <br />
                <textarea
                    name="bio"
                    rows="10"
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                />
                <br />
                {errors.bio && <div className="error">{errors.bio}</div>}
                <br />
                <br />
                {utilisateur.photodeprofile && (
                    <img src={`/${utilisateur.photodeprofile}`} alt="Profile" width="100" />
                )}
                <br />
                <label htmlFor="photodeprofile">Profile Picture:</label>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setData('photodeprofile', file);
                    }}
                />
                <br />
                {errors.photodeprofile && <div className="error">{errors.photodeprofile}</div>}
                <br />
                <button type="submit" disabled={processing}>Update</button>
            </form>
        </>
    );
}
