import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import compose from "recompose/compose";

import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "../collection/common/filter";
import FilterBar from "../collection/common/filter-bar";
import ProductListing from "../collection/common/product-listing";
import StickyBox from "react-sticky-box";
import Card from "react-bootstrap/Card";

import { FaEdit } from "react-icons/fa";

import avatar from "../../assets/images/default-avatar.png";

import userController from "../../services/controllers/userControllers";

class Profil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layoutColumns: 3,
      User: {},
    };
    this.userController = new userController();
  }

  componentDidMount() {
    if (localStorage.getItem("userId")) {
      this.getUser(localStorage.getItem("userId"));
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem("userId")) {
      this.getUser(localStorage.getItem("userId"));
    }
  }

  LayoutViewClicked(colums) {
    this.setState({
      layoutColumns: colums,
    });
  }

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  getUser(id) {
    this.userController.getUser(id).then((res) => {
      this.setState({ User: res.data.data });
      // this.setState({ Annonce: res.data.data.annonce });
    });
  }

  editProfil = () => {
    const { history } = this.props;
    history.push("/editprofile");
  };

  annonceClick = (id) => {
    const { history } = this.props;
    history.push(`/product/${id}`);
  };

  render() {
    if (!this.state.User.annonce) {
      return <span />;
    }
    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>secondhand | Achat et vente en ligne</title>
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Profile"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            <div className="profil-page">
                              {this.state.User.image ? (
                                <img
                                  src={`http://localhost:4000/user/userimage/${
                                    this.state.User.image
                                  }`}
                                  alt="avatar"
                                  className="girl"
                                />
                              ) : (
                                <img
                                  src={avatar}
                                  alt="avatar"
                                  className="girl"
                                />
                              )}
                              <h3>
                                {this.state.User.name +
                                  " " +
                                  this.state.User.surName}
                                <FaEdit
                                  size="20"
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                  }}
                                  onClick={() => this.editProfil()}
                                />
                              </h3>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="filter-main-btn">
                                      <span
                                        onClick={this.openFilter}
                                        className="filter-btn btn btn-theme"
                                      >
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />{" "}
                                        Filter
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <FilterBar
                                      onLayoutViewClicked={(colmuns) =>
                                        this.LayoutViewClicked(colmuns)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div id="card-container">
                              {this.state.User.annonce.map((annonce) => {
                                return (
                                  <Card
                                    id="card-style"
                                    onClick={() =>
                                      this.annonceClick(annonce._id)
                                    }
                                  >
                                    <Card.Img
                                      style={{
                                        width: "240px",
                                        height: "135px",
                                      }}
                                      variant="top"
                                      src={`http://localhost:4000/annonce/annonceImage/${
                                        annonce.image[0].name
                                      }`}
                                    />
                                    <Card.Body>
                                      <Card.Title style={{ fontWeight: "700" }}>
                                        {annonce.title}
                                      </Card.Title>
                                      <Card.Title>
                                        {annonce.price} DT
                                      </Card.Title>
                                      <Card.Text>{annonce.location}</Card.Text>
                                      <Card.Text>{annonce.date}</Card.Text>
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default compose(withRouter)(Profil);
