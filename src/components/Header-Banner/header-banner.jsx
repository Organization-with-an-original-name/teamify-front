import React from "react";
import './header-banner.scss';



export const HeaderBanner = function(){
    return(
        <section className="header-banner">
            <div className="header-banner-wrap">
                <div className="header-banner-container">
                    <h2 className="banner-text mb-3">Find the <br /> most exciting <br /> Team!</h2>
                    <div className="banner-search d-flex">
                        <div className="search-input-wrap">
                            <input className="search-input" placeholder="Enter lorem" type="text" />
                        </div>
                        <div className="search-input-wrap">
                            <input className="search-input" placeholder="Enter lorem" type="text" />
                        </div>
                 
                        <input className="search-submit" value="Find Team" type="submit" />
                    </div>
                </div>
            </div>
        </section>
    );
}
