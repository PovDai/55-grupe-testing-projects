import { Link } from "react-router";

export function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
               <p className="col-md-4 mb-0 text-body-secondary">&copy; {new Date().getFullYear()} Povilas tests</p>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-2 text-warning">Home</Link>
                    </li>
             
                </ul>
            </footer>
        </div>
    );
}