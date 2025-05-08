"use client"

import React from 'react';
import { Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-4 bg-primary mt-auto" data-bs-theme="dark">
        <div className="container px-4">
            <Nav className="d-flex align-items-center justify-content-between small">
                <Nav.Item className="text-muted">Copyright &copy; 광명 우리교회 Website 2025</Nav.Item>
                <Nav.Link href='#' >
                    <span>Privacy Policy</span>
                    &middot;
                    <span>Terms &amp; Conditions</span>
                </Nav.Link>
            </Nav>
        </div>
    </footer>
  );
}
export default Footer;