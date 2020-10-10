import React, { Component } from "react";
import "../assets/css/ItemList.css";
import moment from "moment";
import axios from "axios";
import { Redirect } from "react-router";
import Moment from "react-moment";
import FoundForm from "./FoundForm";

class Item extends Component {
  state = {
    redirect: false,
    thisType: this.props.thisType,
    email: "",
    phone: "",
    url: "",
  };

  displayButton(primaryConfirmModal, buttonMessage) {
    if (this.props.userType === "STUDENT") {
      return (
        <a
          href="#"
          data-toggle="modal"
          data-target={primaryConfirmModal}
          class="btn btn-primary"
          id="founditbtn"
        >
          {buttonMessage}
        </a>
      );
    } else {
      return (
        <a href="#" class="btn btn-primary" id="founditbtn">
          Delete
        </a>
      );
    }
  }
  sendFoundMessage = (event) => {
    event.preventDefault();
    var currentdate = new moment().format("YYYY-MM-DD HH:mm:ss");
    const uid = this.props.uid;
    const itemId = this.props.item.id;
    var message = "I want to claim this item.";
    if (this.state.thisType === "LOST") {
      message = "I found this item.";
    }
    axios.get(`messages/checkFound?uid=${uid}&itemId=${itemId}`).then((res) => {
      if (res.data && res.data.length) {
      } else {
        const sender = "STUDENT";
        axios
          .post(
            `messages?date=${currentdate}&uid=${uid}&itemId=${itemId}&message=${message}&sender=${sender}`
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
        axios
          .post(
            `messages/postClaim?date=${currentdate}&uid=${uid}&itemId=${itemId}&email=${this.state.email}&phone=${this.state.phone}`
          )
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
      }
    });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.url} />;
    }
    const {
      date,
      id,
      title,
      description,
      image,
      found_location,
    } = this.props.item;
    var modalId = `myModal${id}`;
    var primaryModalId = `#${modalId}`;
    var confirmModal = `modalSendMessage${id}`;
    var primaryConfirmModal = `#${confirmModal}`;
    var buttonMessage = "Claim It";
    if (this.state.thisType === "LOST") {
      buttonMessage = "Found It";
    }

    return (
      <React.Fragment>
        <div class="col-sm-4" id="cardmargin">
          <div class="card">
            <img
              class="img-responsive"
              src={require(`../assets/images/${image}`)}
            />

            <div class="card-body">
              <h4 class="card-title">
                <strong>{title}</strong>
              </h4>
              <p class="card-text" id="card-date">
                Posted on:<Moment format="DD/MM/YYYY hh:mma">{date}</Moment>
              </p>
              <a
                href="#!"
                class="orange-text "
                data-toggle="modal"
                data-target={primaryModalId}
                style={{ textDecoration: "None" }}
              >
                <h5 class="waves-effect waves-light">Show more...</h5>
              </a>

              <div
                class="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                id={modalId}
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div class="modal-content">
                    {/* <div class="modal-body">
                    <img
                      class="card-img-top"
                      src={require(`../assets/images/${image}`)}
                      alt="Card image cap"
                    />
                    <p class="card-text">{description}</p>
                  </div> */}
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-lg-5">
                          {/* <!--Carousel Wrapper--> */}
                          <div
                            id="carousel-thumb"
                            class="carousel slide carousel-fade carousel-thumbnails"
                            data-ride="carousel"
                          >
                            {/* <!--Slides--> */}
                            <div class="carousel-inner" role="listbox">
                              <div class="carousel-item active">
                                <img
                                  class="img-responsive"
                                  src={require(`../assets/images/${image}`)}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <!--/.Carousel Wrapper--> */}
                        </div>
                        <div class="col-lg-7">
                          <h2 class="h2-responsive product-name">
                            <strong>{title}</strong>
                          </h2>

                          <p class="card-text" id="card-date">
                            Posted on:{" "}
                            <Moment format="DD/MM/YYYY hh:mma">{date}</Moment>
                          </p>
                          {/* <!--Accordion wrapper--> */}
                          <div
                            class="accordion md-accordion"
                            id="accordionEx"
                            role="tablist"
                            aria-multiselectable="true"
                          >
                            {/* <!-- Accordion card --> */}
                            <div class="card">
                              {/* <!-- Card header --> */}
                              <div
                                class="card-header"
                                role="tab"
                                id="headingOne1"
                              >
                                <a
                                  data-toggle="collapse"
                                  data-parent="#accordionEx"
                                  href="#collapseOne1"
                                  aria-expanded="true"
                                  aria-controls="collapseOne1"
                                >
                                  <h5 class="mb-0">Item Description</h5>
                                </a>
                              </div>

                              {/* <!-- Card body --> */}
                              <div
                                id="collapseOne1"
                                class="collapse show"
                                role="tabpanel"
                                aria-labelledby="headingOne1"
                                data-parent="#accordionEx"
                              >
                                <div class="card-body">{description}</div>
                              </div>
                            </div>
                            {/* <!-- Accordion card -->

                            <!-- Accordion card --> */}
                            <div class="card">
                              {/* <!-- Card header --> */}
                              <div
                                class="card-header"
                                role="tab"
                                id="headingTwo2"
                              >
                                <a
                                  class="collapsed"
                                  data-toggle="collapse"
                                  data-parent="#accordionEx"
                                  href="#collapseTwo2"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo2"
                                >
                                  <h5 class="mb-0">Item Location</h5>
                                </a>
                              </div>

                              {/* <!-- Card body --> */}
                              <div
                                id="collapseTwo2"
                                class="collapse show"
                                role="tabpanel"
                                aria-labelledby="headingTwo2"
                                data-parent="#accordionEx"
                              >
                                <div class="card-body">{found_location}</div>
                              </div>
                            </div>
                            {/* <!-- Accordion card --> */}
                          </div>
                          {/* <!-- Accordion wrapper -->
                     <!-- Add to Cart --> */}
                          <div class="card-body">
                            <div class="text-right">
                              <button
                                type="button"
                                class="btn btn-primary"
                                id="cancelbtnmd"
                                data-dismiss="modal"
                              >
                                <strong>Close</strong>
                              </button>
                              <button class="btn btn-primary" id="founditbtnmd">
                                {" "}
                                {buttonMessage}
                              </button>
                            </div>
                          </div>
                          {/* <!-- /.Add to Cart --> */}
                        </div>
                      </div>
                    </div>
                    {this.displayButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FoundForm
          confirmModal={confirmModal}
          sendFoundMessage={this.sendFoundMessage}
          email={this.state.email}
          onChangeEmail={this.onChangeEmail}
          phone={this.state.phone}
          onChangePhone={this.onChangePhone}
        />
      </React.Fragment>
    );
  }
}

export default Item;
