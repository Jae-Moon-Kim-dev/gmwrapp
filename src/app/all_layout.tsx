// import "../css/styles.css";
import React from 'react';
import 'bootswatch/dist/sandstone/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <body>
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav ms-md-auto">
                <li className="nav-item">
                <a className="nav-link active" href="#">Home
                    <span className="visually-hidden">(current)</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </li>
            </ul>
            <form className="d-flex">
                123
            </form>
            </div>
        </div>
        </nav>
        <main>
            <section className="d-flex" id="section_1">
                <div className="container d-flex flex-column justify-content-end">
                    <div className="row h-100">

                        <div className="col-lg-6 col-12 my-auto">
                            <h2>👋 Hi there, You're invited</h2>

                            <h1 className="text-white hero-title mb-4">We're getting married</h1>

                            <p className="text-white mb-2">
                                <i className="bi-check-circle-fill custom-icon me-1"></i>
                                Wedding HTML Template
                            </p>

                            <p className="text-white">
                                <i className="bi-check-circle-fill custom-icon me-1"></i>
                                Bootstrap v5.1.3 Layout
                            </p>

                            <a href="#section_2" className="custom-link custom-btn btn mt-4">Discover More</a>
                        </div>

                        <div className="col-lg-3 col-12 save-the-date-wrap mt-auto ms-lg-auto">
                            <div className="save-the-date-thumb">
                                <h4 className="save-the-date-title">Save the date</h4>

                                <div className="save-the-date-body">
                                    <span className="date">14th October 2024</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
        <footer className="py-4 bg-light mt-auto">
            <div className="container px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2023</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
      </body>
    </>
  );
}
