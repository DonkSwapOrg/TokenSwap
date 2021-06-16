import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul style={{ margin: "auto" }} class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#tokens">
                PRE-SALE
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#roadmap">
                ROADMAP
              </a>
            </li>
            <li class="nav-item">
              <a
                id="navbarDropdown"
                target="_blank"
                href="https://shibanova.medium.com/"
                class="nav-link"
              >
                DOCS
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
              >
                SOCIALS
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://t.me/Shibverify"
                >
                  Telegram
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.twitter.com/ShibaNovaDefi"
                >
                  Twitter
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.instagram.com/ShibaNovaDEFI"
                >
                  Instagram
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://www.facebook.com/ShibaNovaDEFI"
                >
                  Facebook
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

var mountNode = document.body;
ReactDOM.render(<App name="Jane" />, mountNode);
