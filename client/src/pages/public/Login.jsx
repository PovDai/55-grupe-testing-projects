import { Link } from "react-router";
import { LoginForm } from "../../components/forms/LoginForm";
import { PublicPageTitle } from "../../components/PublicPageTitle";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";

export function LoginPage() {
    const { isLoggedIn,  color,  role } = useContext(UserContext);
    const [coloris, setColoris] = useState('none')
    const [count, setCount] = useState(0);

    function handleGrey() {
        setColoris('')
    }
    function handleCount() {
        setCount(count +1 );
    }
 
    

    return (
        <main className="min-page-height">
            <PublicPageTitle title="Login" />
         
            <div className="container">
                <div  className="row">
                    {
                        isLoggedIn
                            ? <>
                                <h1 style={{ backgroundColor: color}}>Jūs esate prisijunge kaip {role} vartotojai</h1>
                                <p style={{ backgroundColor: coloris}}>Einamuoju metu prie sistemos prisijunge vartotojai negali prisijungti prie kitos paskyros. Noredami ta atlikti - atsijunkite nuo dabartines paskyros.</p>
                                <div className="d-flex gap-3">
                                    <Link to='/logout' className="btn btn-success">Logout</Link>
                                    or
                                    <Link to='/admin' className="btn btn-warning">Go to dashboard</Link>
                                </div>
                            </>

                            : <LoginForm />
                    }
                </div>
            </div>
        </main>
    );
}