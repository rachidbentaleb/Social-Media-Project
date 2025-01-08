import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        nom: '',
        prenom: '',
        email: '',
        mdp: '',
        mdp_confirmation: '',
        bio: '',
        photodeprofile: null,
    });

    function submit(e) {
        e.preventDefault();
        post('/utilisateurs', {
            forceFormData: true,
        });
    }

    return (
        <>
            <h1>Signup</h1>
            <p>Welcome to the Signup page</p>
            <form onSubmit={submit} encType="multipart/form-data">
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    name="nom"
                    value={data.nom}
                    onChange={(e) => setData('nom', e.target.value)}
                />
                {errors.nom && <div className="error">{errors.nom}</div>}

                <br />

                <label htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={data.prenom}
                    onChange={(e) => setData('prenom', e.target.value)}
                />
                {errors.prenom && <div className="error">{errors.prenom}</div>}

                <br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <br />

                <label htmlFor="mdp">Mot de passe:</label>
                <input
                    type="password"
                    name="mdp"
                    value={data.mdp}
                    onChange={(e) => setData('mdp', e.target.value)}
                />
                {errors.mdp && <div className="error">{errors.mdp}</div>}

                <br />

                <label htmlFor="mdp_confirmation">Confirmer mot de passe:</label>
                <input
                    type="password"
                    name="mdp_confirmation"
                    value={data.mdp_confirmation}
                    onChange={(e) => setData('mdp_confirmation', e.target.value)}
                />
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
                {errors.bio && <div className="error">{errors.bio}</div>}

                <br />

                <label htmlFor="photodeprofile">Profile Picture:</label>
                <input
                    type="file"
                    name="photodeprofile"
                    onChange={(e) => setData('photodeprofile', e.target.files[0])}
                />
                {errors.photodeprofile && <div className="error">{errors.photodeprofile}</div>}

                <br />

                <button type="submit" disabled={processing}>Create</button>
            </form>
        </>
    );
}
