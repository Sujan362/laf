import React, { Component } from "react";
import { Redirect } from "react-router";

export default class FoundForm extends Component {
  state = {
    redirect: false,
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.sendFoundMessage(e);
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      var url = `/StudentHome/inbox`;
      return <Redirect push to={url} />;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmitHandler}>
          {/* <!--Modal: modalConfirmSendMessage--> */}
          <div
            class="modal fade"
            id={this.props.confirmModal}
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-sm modal-notify modal-danger-centered"
              role="document"
            >
              {/* <!--Content--> */}
              <div class="modal-content text-center">
                {/* <!--Header--> */}
                <div
                  class="modal-header d-flex justify-content-center"
                  id="modalsure"
                >
                  <p class="heading">
                    Please fill in the following information.
                  </p>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="claimant-email" class="col-form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="title"
                      value={this.props.email}
                      onChange={this.props.onChangeEmail}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="claimant=phone" class="col-form-label">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      class="form-control"
                      id="phone"
                      pattern="[0-9]{10}"
                      value={this.props.phone}
                      onChange={this.props.onChangePhone}
                    ></input>
                    <small>Format: Enter a 10-digit phone number.</small>
                    <br />
                  </div>
                </div>
                {/* <!--Footer--> */}
                <div class="modal-footer justify-content-center">
                  <a
                    type="button"
                    class="btn btn-outline-danger waves-effect waves-danger"
                    data-dismiss="modal"
                    id="modalheadcolorfooter"
                  >
                    Cancel
                  </a>
                  <button
                    class="btn btn-primary waves-effect waves-light"
                    id="postitemmodal"
                    type="Submit"
                    value="Submit"
                  >
                    Send
                    <i class="fa fa-paper-plane ml-1"></i>
                  </button>
                </div>
              </div>
              {/* <!--/.Content--> */}
            </div>
          </div>

          {/* <!--Modal: modalConfirmDelete--> */}
        </form>
      </React.Fragment>
    );
  }
}
