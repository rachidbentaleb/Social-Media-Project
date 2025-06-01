import React from 'react';
import { useForm } from "@inertiajs/react";
import './Login.css';

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
    <div className="login-wrapper">
      <form className="login-form" onSubmit={submit}>
        <h1>Connexion</h1>

        <label>Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          placeholder="Entrer votre email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Mot de passe</label>
        <input
          type="password"
          value={data.mdp}
          onChange={(e) => setData('mdp', e.target.value)}
          placeholder="********"
        />
        {errors.mdp && <p className="error">{errors.mdp}</p>}

        <button type="submit" disabled={processing}>
          {processing ? "Connexion..." : "Se connecter"}
        </button>

        <p className="forgot">Mot de passe oublié ?</p>
      </form>
    </div>
  );
}
