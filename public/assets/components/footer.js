class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <footer class="footer">
      <div class="container-fluid">
          <nav class="pull-left">
              <ul>
                  <li>
                      <a href="#">
                          Home
                      </a>
                  </li>
                  <li>
                      <a href="#">
                          Zamp
                      </a>
                  </li>
                  <li>
                      <a href="#">
                          Contact
                      </a>
                  </li>
              </ul>
          </nav>
          <p class="copyright pull-right">
              &copy;2021 <a href="https://www.ducksoftware.net" target="_blank">Duck Software</a>, quack quack mofo
          </p>
      </div>
     </footer>
      `;
    }
  }
  
  customElements.define('footer-component', Footer);