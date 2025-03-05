import { Link } from "@inertiajs/react";
import './Home.css'
import logo from '../../../public/images/logo.svg'
import googleicone from '../../../public/images/google-icone.svg'
import backlines from '../../../public/images/backlines.svg'


export default function Home(){
    return (
        <div className="home">
            <img  className='backlines' src={backlines} alt="backlines" />
            <div className="headline">
                <h1>Connect with people. Share your world.</h1>
                <p>A new way to connect with friends and like-minded people.</p>
            </div>
            <div className="signupcontainer">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="titledescription">
                    <h2>Stay connected with the people that matter.</h2>
                    <p>Sign up to see more</p>
                </div>
                <div className="call-to-action">
                    <button className="signup"><Link href="/utilisateurs/create">Sign Up</Link></button>
                    <button><Link href="/login">Sign in</Link></button>
                    <button className="google">
                        <span><img src={googleicone} alt="google-icone" /></span>
                        <p>Sign in with google</p>
                    </button>
                </div>
                <div className="conditions">
                    <p>By creating an account, you agree to <span> the Terms of use</span> <span>and Privacy Policy.</span> </p>
                </div>
            </div>
        </div>
    )
}