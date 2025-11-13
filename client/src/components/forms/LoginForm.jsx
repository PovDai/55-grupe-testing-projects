import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/user/UserContext";
import { SERVER_ADDRESS } from "../../env";

export function LoginForm() {
    const navigate = useNavigate();
    const { isLoggedIn, login } = useContext(UserContext);

    const [usernameOrEmail, setUserNameOrEmail] = useState('');
    const [usernameOrEmailErr, setUsernameOrEmailErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [formErr, setFormErr] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0); // naujas state

    // Automatinis redirect jei jau prisijungęs
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/admin");
        }
    }, [isLoggedIn, navigate]);

    function handleSubmitNavigate(e) {
        e.preventDefault();

        // Išvalome senas klaidas
        setFormErr('');
        setUsernameOrEmailErr('');
        setPasswordErr('');

        fetch(SERVER_ADDRESS + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ usernameOrEmail, password }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'error') {
                // Padidiname login attempts
                setLoginAttempts(prev => prev + 1);

                // Bendroji klaida
                if (typeof data.msg === 'string') {
                    setFormErr(`${data.msg} (Bandymų: ${loginAttempts + 1})`);
                }

                // Laukų klaidos
                if (data.msg?.usernameOrEmail) setUsernameOrEmailErr(data.msg.usernameOrEmail);
                if (data.msg?.password) setPasswordErr(data.msg.password);

            } else {
                // Sėkmingas login
                if (data.user) login(data.user.email, data.user.id);
                navigate('/admin');
            }
        })
        .catch(err => {
            console.error(err);
            setLoginAttempts(prev => prev + 1);
            setFormErr(`Serverio klaida (Bandymų: ${loginAttempts + 1})`);
        });
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <form onSubmit={handleSubmitNavigate} className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mt-5">
                    {/* Bendroji klaida virš formos */}
                    {formErr && <div className="alert alert-danger">{formErr}</div>}

                    {/* Username/Email laukelis */}
                    <div className="mb-4">
                        <label htmlFor="username_or_email" className="form-label">Login name or email</label>
<input
  onChange={e => setUserNameOrEmail(e.target.value)}
  value={usernameOrEmail}
  id="username_or_email"
  type="text"
  className={"form-control input-dark" + (usernameOrEmailErr ? ' is-invalid' : '')}
  placeholder="Enter username or email"
  required
/>
                        <div className="invalid-feedback">{usernameOrEmailErr}</div>
                    </div>

                    {/* Password laukelis */}
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
<input
  onChange={e => setPassword(e.target.value)}
  value={password}
  id="password"
  type="password"
  className={"form-control input-dark" + (passwordErr ? ' is-invalid' : '')}
  placeholder="Enter password"
  required
/>
                        <div className="invalid-feedback">{passwordErr}</div>
                    </div>

                    {/* Login mygtukas */}
                    <div className="mb-4">
                        <button type="submit" className="btn btn-warning w-100 py-2 fs-5">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
