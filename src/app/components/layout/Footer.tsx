import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-primary mt-auto" data-bs-theme="dark">
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
  );
}
export default Footer;