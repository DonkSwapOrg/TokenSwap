import React, {useState} from "react";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark presale">
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

    <div
      style={{ justifyContent: "space-between" }}
      className="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link-icon"
            target="_blank"
            href="https://t.me/Shibverify"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8424 17.093L17.492 9.35872C17.6378 8.678 17.245 8.41015 16.7961 8.57729L7.10066 12.2937C6.4385 12.5501 6.44999 12.9187 6.98863 13.0859L9.4685 13.8559L15.2254 10.2509C15.4948 10.0723 15.7418 10.173 15.54 10.3516L10.8833 14.5366L10.7038 17.0816C10.9616 17.0816 11.0744 16.9701 11.2087 16.8359L12.4202 15.6751L14.9339 17.5166C15.3942 17.773 15.7195 17.6394 15.8431 17.0923L15.8424 17.093ZM22.609 12.5059C22.609 18.0301 18.1089 22.5059 12.5545 22.5059C7.00012 22.5059 2.5 18.0301 2.5 12.5059C2.5 6.98157 7.00012 2.50586 12.5545 2.50586C18.1089 2.50586 22.609 6.98157 22.609 12.5059Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link-icon"
            target="_blank"
            href="https://shibanova.medium.com/"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.3972 2.50586H5.03611C4.01204 2.50586 3.5 3.06141 3.5 4.17253V20.8392C3.5 21.9503 4.01204 22.5059 5.03611 22.5059H20.3972C21.4213 22.5059 21.9333 21.9503 21.9333 20.8392V4.17253C21.9333 3.06141 21.4213 2.50586 20.3972 2.50586ZM8.00069 8.63978C8.02748 8.71713 8.03738 8.80016 8.02964 8.88236V14.9132C8.06266 15.1315 8.00122 15.354 7.86297 15.5124L6.57264 17.2507V17.4799H10.2324V17.2507L8.94209 15.5124C8.87317 15.4333 8.8214 15.3386 8.79057 15.2351C8.75974 15.1316 8.75063 15.0219 8.7639 14.914V9.69736L11.9767 17.4807H12.3499L15.1096 9.69736V15.9007C15.1096 16.0665 15.1096 16.0982 15.012 16.2065L14.0197 17.2765V17.5057H18.8385V17.2774L17.8807 16.2324C17.7962 16.1607 17.754 16.044 17.7716 15.9274V8.25236C17.7631 8.19559 17.7687 8.13737 17.7879 8.08375C17.8071 8.03012 17.8391 7.98303 17.8807 7.94736L18.8615 6.90153V6.67236H15.4652L13.0443 13.379L10.29 6.67236H6.72779V6.90153L7.87526 8.43653C7.93098 8.49286 7.97391 8.56243 8.00069 8.63978Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link-icon"
            target="_blank"
            href="https://www.twitter.com/ShibaNovaDefi"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.563 9.09275C20.563 14.5152 16.4129 20.7677 8.82429 20.7677C6.58192 20.7699 4.38635 20.1298 2.5 18.924C3.5805 19.0539 4.67617 18.9707 5.72428 18.679C6.77239 18.3873 7.75237 17.8928 8.60812 17.224C7.74758 17.2079 6.91359 16.9248 6.22271 16.4143C5.53184 15.9038 5.0186 15.1913 4.75473 14.3765C5.37285 14.4946 6.00992 14.4706 6.61733 14.3065C5.68336 14.1186 4.84353 13.6151 4.24035 12.8815C3.63716 12.1478 3.30779 11.2292 3.30813 10.2815V10.2315C3.8809 10.5486 4.5218 10.7243 5.17702 10.744C4.61179 10.3691 4.14851 9.86098 3.82837 9.26496C3.50824 8.66895 3.34118 8.00348 3.34207 7.32775C3.34207 6.5765 3.54567 5.8715 3.90009 5.26525C4.93615 6.53281 6.2286 7.56955 7.69358 8.30818C9.15855 9.04682 10.7633 9.47085 12.4037 9.55275C12.1942 8.67209 12.2834 7.74725 12.6574 6.92225C13.0314 6.09725 13.6691 5.41838 14.4714 4.99134C15.2736 4.56431 16.1953 4.41307 17.0929 4.56118C17.9905 4.7093 18.8137 5.14844 19.4343 5.81025C20.358 5.62925 21.2438 5.29275 22.0535 4.81525C21.7457 5.76523 21.1011 6.57153 20.2399 7.084C21.0575 6.98756 21.8561 6.77016 22.609 6.439C22.0552 7.26303 21.3581 7.9822 20.5504 8.56275C20.5592 8.73775 20.563 8.91525 20.563 9.09275Z"
                fill="white"
              />
            </svg>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">
            HOME
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://t.me/ShibaNovaDEX">
            TELEGRAM
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://shibanova.medium.com/">
            MEDIUM
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://www.twitter.com/ShibaNovaDefi">
            TWITTER
          </a>
        </li>
      </ul>
    </div>
    <div className="connect">
      <button className="btn btn-primary">CONNECT WALLET</button>
    </div>
  </nav>
);

export default Header;
