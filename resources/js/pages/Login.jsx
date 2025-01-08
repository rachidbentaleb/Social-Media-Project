import React from 'react';
import { useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        mdp: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={submit}>
                <label>Email</label>
                <input 
                    type="email" 
                    value={data.email} 
                    onChange={(e) => setData('email', e.target.value)} 
                />
                {errors.email && <div>{errors.email}</div>}

                <label>Password</label>
                <input 
                    type="password" 
                    value={data.mdp} 
                    onChange={(e) => setData('mdp', e.target.value)} 
                />
                {errors.mdp && <div>{errors.mdp}</div>}

                <button type="submit" disabled={processing}>Login</button>
            </form>
        </div>
    );
}
