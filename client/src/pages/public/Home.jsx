import { Link } from 'react-router';
import heroImg from '../../assets/hero.png';
import homeTesting from '../../assets/home_testing.jpg';

export function HomePage() {
    return (
        <main className='min-page-height'>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={homeTesting} className="d-block mx-lg-auto img-fluid transparent-img " alt="Bootstrap Themes"
                            width={700} height={500} loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold  lh-1 mb-3 golden">Povilas testing page</h1>
                        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to="/admin" className="btn btn-warning btn-lg px-4 me-md-2">Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}