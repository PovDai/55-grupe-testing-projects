import { Link } from "react-router";

export function Sidebar() {
    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0  sidebar_back">
            <div className="offcanvas-md offcanvas-end " tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-uppercase golden">
                        <span>Select</span>
                    </h6>
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/stocks">
                                Stocks
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/advice">
                                Advice page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/weather">
                                Weather
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/calculator">
                                Calculator
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/checkers">
                                Checkers
                            </Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 golden " to="/admin/matrix">
                                Matrix Room 
                            </Link>
                        </li>
                       
                    </ul>
                
                </div>
            </div>
        </div>
    );
}