// src/components/Header/index.js
import React from "react";

import "./Header.css";
 
class Header extends React.Component {

  render() {


    return (
      <nav className="Nav">

        <div className="Nav-menus">

          <div className="Nav-brand">

            <a className="Nav-brand-logo" href="/">
            

            </a>
            {/* <BrowserRouter>
                <div>
                  <Navigation />
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/agreement" component={Agreement} />
                    <Route component={Error} />
                  </Switch>
                </div>
              </BrowserRouter> */}
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;