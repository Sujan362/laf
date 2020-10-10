import React from "react";
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          Lost
          <span className="spanClass"> & </span>
          <span style={{ marginLeft: -"5px" }}>Found</span>
        </h3>

        <p class="footer-links">
          <a href="#">Home</a>|<a href="#">About</a>|<a href="#">Contact</a>
        </p>

        <p class="footer-company-name">
          © 2020 Lost & Found Management System.
        </p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span>Assumption University of Thailand, Suvarnabhumi Campus</span>
            Bangsaothong, Samutprakarn Thailand 10570
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+66-02-723-2222</p>
        </div>
        <div>
          <i class="fa fa-envelope"></i>
          <p>lostandfoundabac@gmail.com</p>
        </div>
      </div>
      <div class="footer-right">
        <i class="footer-company-about">
          <span>About the System</span>
          <p>Lost item section can be used to search for lost items.</p>
          <p>
            Found item section can be used to claim the items which have been
            found.
          </p>
        </i>
      </div>
    </footer>
  );
}
