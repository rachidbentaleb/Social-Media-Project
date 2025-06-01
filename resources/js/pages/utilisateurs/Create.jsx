import { useForm } from "@inertiajs/react";
import logo from '../../../../public/images/LOGO.svg';
import "./Create.css";

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
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2>Create Your Account</h2>
                    <p>Join our community and start sharing your moments today.</p>
                </div>
                <form onSubmit={submit} encType="multipart/form-data" className="form-body">
                    <div className="nom-prenom">
                        <div className="form-group half">
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={data.nom}
                                onChange={(e) => setData('nom', e.target.value)}
                            />
                            {errors.nom && <div className="error">{errors.nom}</div>}
                        </div>
                        <div className="form-group half">
                            <label htmlFor="prenom">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={data.prenom}
                                onChange={(e) => setData('prenom', e.target.value)}
                            />
                            {errors.prenom && <div className="error">{errors.prenom}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="mdp">Mot de passe</label>
                        <input
                            type="password"
                            name="mdp"
                            value={data.mdp}
                            onChange={(e) => setData('mdp', e.target.value)}
                        />
                        {errors.mdp && <div className="error">{errors.mdp}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="mdp_confirmation">Confirmer mot de passe</label>
                        <input
                            type="password"
                            name="mdp_confirmation"
                            value={data.mdp_confirmation}
                            onChange={(e) => setData('mdp_confirmation', e.target.value)}
                        />
                        {errors.mdp_confirmation && <div className="error">{errors.mdp_confirmation}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            name="bio"
                            rows="4"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                        ></textarea>
                        {errors.bio && <div className="error">{errors.bio}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="photodeprofile">Photo de profil</label>
                        <input
                            type="file"
                            name="photodeprofile"
                            onChange={(e) => setData('photodeprofile', e.target.files[0])}
                        />
                        {errors.photodeprofile && <div className="error">{errors.photodeprofile}</div>}
                    </div>

                    <button type="submit" disabled={processing}>Créer mon compte</button>
                </form>
            </div>
        </div>
    );
}
