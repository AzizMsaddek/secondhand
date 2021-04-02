import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class SideBar extends Component {


    closeNav() {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide)
            closemyslide.classList.remove('open-side');
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub1'))
            event.target.nextElementSibling.classList.remove('opensub1')
        else{
            document.querySelectorAll('.opensub1').forEach(function (value) {
                value.classList.remove('opensub1');
            });
            event.target.nextElementSibling.classList.add('opensub1')
        }
    }
    handleSubTwoMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub2'))
            event.target.nextElementSibling.classList.remove('opensub2')
        else{
            document.querySelectorAll('.opensub2').forEach(function (value) {
                value.classList.remove('opensub2');
            });
            event.target.nextElementSibling.classList.add('opensub2')
        }
    }
    handleSubThreeMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub3'))
            event.target.nextElementSibling.classList.remove('opensub3')
        else{
            document.querySelectorAll('.opensub3').forEach(function (value) {
                value.classList.remove('opensub3');
            });
            event.target.nextElementSibling.classList.add('opensub3')
        }
    }
    handleSubFourMenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensub4'))
            event.target.nextElementSibling.classList.remove('opensub4')
        else{
            document.querySelectorAll('.opensub4').forEach(function (value) {
                value.classList.remove('opensub4');
            });
            event.target.nextElementSibling.classList.add('opensub4')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if(event.target.nextElementSibling.classList.contains('opensidesubmenu'))
            event.target.nextElementSibling.classList.remove('opensidesubmenu')
        else{
            event.target.nextElementSibling.classList.add('opensidesubmenu')
        }
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="sidebar-overlay" onClick={this.closeNav}></a>
                <nav>
                    <a onClick={this.closeNav}>
                        <div className="sidebar-back text-left">
                            <i className="fa fa-angle-left pr-2" aria-hidden="true"></i> Back
                        </div>
                    </a>
                    <ul id="sub-menu" className="sidebar-menu">
                        <li>
                            <Link to="#" onClick={(e) => this.handleMegaSubmenu(e)}>
                                Vetement
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul className="mega-menu clothing-menu">
                                <li>
                                    <div className="row m-0">
                                        <div className="col-xl-4">
                                            <div className="link-section">
                                                <h5>Mode Femme</h5>
                                                <ul>
                                                    <li>
                                                        <Link to="/collection">Robes</Link>
                                                    </li>
                                                    <li>
                                                    <Link to="/collection">jupes</Link>
                                                    </li>
                                                    
                                                    
                                                    <li>
                                                        <Link to="/collection">vêtement de sport</Link>
                                                    </li>
                                                </ul>
                                                <h5>Mode Homme</h5>
                                                <ul>
                                                    <li>
                                                        <Link to="/collection">vêtement de sport</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">vêtement chic</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">sport chic</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="link-section">
                                                <h5>accessories</h5>
                                                <ul>
                                                    <li>
                                                        <Link to="/collection">bijoux fantaisie</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">casquettes et chapeaux</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">bijoux précieux</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">colliers</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">des boucles d'oreilles</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">accessoires de poignet</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">cravates</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/collection">boutons de manchette</Link>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <a href="#" className="mega-menu-banner">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/accnav.jpg`} alt="" className="img-fluid"/>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/collection" onClick={(e) => this.handleSubmenu(e)}>
                            Sacs
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                
                                <li>
                                    <Link to="/collection">sacs pour ordinateur portable</Link>
                                </li>
                               
                                <li>
                                    <Link to="/collection" onClick={(e) => this.handleSubTwoMenu(e)} >
                                    sacs à main
                                        <span className="sub-arrow"></span>
                                    </Link>
                                    <ul>
                                        
                                        <li>
                                            <Link to="/collection">portefeuilles</Link>
                                        </li>
                                        
                                        <li>
                                            <Link to="/collection">cartables</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/collection" onClick={(e) => this.handleSubmenu(e)}>
                            chaussure
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/collection">chaussures de sport</Link>
                                </li>
                                <li>
                                    <Link to="/collection">chaussures formelles</Link>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <Link to="/collection" >
                            montres
                            </Link>
                        </li>
                        
                        <li>
                            <Link to="#" onClick={(e) => this.handleSubmenu(e)}>
                            beauté et soins personnels
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/collection">makeup</Link>
                                </li>
                                
                                <li>
                                    <Link to="/collection" onClick={(e) => this.handleSuTwobmenu(e)}>
                                    Suite
                                        <span className="sub-arrow"></span>
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to="/collection">parfums</Link>
                                        </li>
                                        
                                        <li>
                                            <Link to="/collection">outils et brosses</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>


                        <li>
                            <Link to="/collection" onClick={(e) => this.handleSubmenu(e)}>
                            décoration de maison
                                <span className="sub-arrow"></span>
                            </Link>
                            <ul>
                                <li>
                                    <Link to="/collection">cuisine</Link>
                                </li>
                                <li>
                                    <Link to="/collection">Salon</Link>
                                </li>
                                <li>
                                    <Link to="/collection">Chambre</Link>
                                </li>
                                <li>
                                    <Link to="/collection">Jardin</Link>
                                </li>
                                
                            </ul>
                        </li>
  
                    </ul>
                </nav>
            </div>

        )
    }
}


export default SideBar;