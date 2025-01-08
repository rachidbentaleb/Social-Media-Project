import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        contenu: '',
        image: null,
        utilisateur_id: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/posts', {
            forceFormData: true,
        });
    }

    return (
        <>
            <h1>Bonjour !</h1>
            <p>Quoi de neuf ?</p>
            <form onSubmit={submit} encType="multipart/form-data">
                <label htmlFor="contenu">Contenu:</label>
                <br />
                <textarea
                    name="contenu"
                    value={data.nom}
                    onChange={(e) => setData('contenu', e.target.value)}
                />

                {errors.contenu && <div className="error">{errors.contenu}</div>}

                <br />
                <br />

                <label htmlFor="image">image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setData('image', e.target.files[0])}
                />
                {errors.image && <div className="error">{errors.image}</div>}

                <br />

                <button type="submit" disabled={processing}>Create</button>
            </form>
        </>
    );
}
