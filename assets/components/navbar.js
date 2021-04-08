class Navbar extends HTMLElement {
    constructor() {
      super();
    }
  
    //  add class="active" to the <li> to add a border to the current page

    connectedCallback() {
      this.innerHTML = `
      <div class="sidebar" data-color="blue">      
      <div class="sidebar-wrapper">
      <div class="logo">
          <img src="https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6ImJ1c2luZXNzZXMvbG9nb3Mvb3JpZ2luYWwvNjAwNDE0MC9waWN0dXJlIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxODIsImhlaWdodCI6MTgyfX19" alt="..." 
          style="width:50%;
          height:50%; 
          display:block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;">
          <a target="_blank" href="http://www.zampmarketing.com" class="simple-text">
              Zamp Marketing
          </a>
      </div>    
          <ul class="nav">
              <li>
                  <a href="dashboard.html">
                      <i class="pe-7s-graph"></i>
                      <p>Home</p>
                  </a>
              </li>
              <li>
              <a href="swag.html">
                  <i class="pe-7s-map-marker"></i>
                  <p>Swag Manager</p>
              </a>
              </li>
              <li>
                  <a href="employees.html">
                      <i class="pe-7s-note2"></i>
                      <p>Employees</p>
                  </a>
              </li>
              <li>
              <a href="company.html">
                  <i class="pe-7s-user"></i>
                  <p>Company Profile</p>
              </a>
              </li>
          </ul>
      </div>
  </div>
  </div>
      `;
    }
  }
  
  customElements.define('navbar-component', Navbar);