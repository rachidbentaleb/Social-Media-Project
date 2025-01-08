import { Link } from "@inertiajs/react";

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <p>Welcome to the Home page</p>
            <Link href="/utilisateurs/create">Creer un compte</Link>
            <br />
            <Link href="/login">se connecter</Link>
        </>
    )
}