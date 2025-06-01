import { Link } from "@inertiajs/react";
import logo from "../../../public/images/logo.svg";
import googleIcon from "../../../public/images/google-icone.svg";
import './Home.css'; // Assuming you have a CSS file for styling

export default function Home() {
  return (
    <div className="home-container">
      <div className="left-panel">
        <h1>Exprime-toi librement</h1>
        <p>Rejoins une communauté dynamique et partage ta voix.</p>
      </div>

      <div className="right-panel">
        <img src={logo} alt="logo" className="logo" />
        <h2>Créer un compte</h2>
        <p className="subtitle">Découvre les publications de milliers d'utilisateurs</p>

        <div className="actions">
          <Link href="/utilisateurs/create" className="btn violet">S'inscrire</Link>
          <Link href="/login" className="btn outline">Se connecter</Link>
          <button className="btn google">
            <img src={googleIcon} alt="Google" />
            <span>Continuer avec Google</span>
          </button>
        </div>

        <p className="terms">
          En créant un compte, vous acceptez nos <span>conditions d’utilisation</span> et notre <span>politique de confidentialité</span>.
        </p>
      </div>
    </div>
  );
}
