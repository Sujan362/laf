import React, { Component } from "react";

export default class EditConfirmModal extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <!--Modal: modalConfirmSendMessage--> */}
        <div
          class="modal fade"
          id={this.props.editConfirm}
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
                <p class="heading">Are you sure you want to edit this item?</p>
              </div>
              <div class="modal-body"></div>
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
                  onClick={this.props.onSubmit}
                  data-dismiss="modal"
                  class="btn btn-primary waves-effect waves-light"
                  id="postitemmodal"
                >
                  Yes
                  <i class="fa fa-paper-plane ml-1"></i>
                </button>
              </div>
            </div>
            {/* <!--/.Content--> */}
          </div>
        </div>

        {/* <!--Modal: modalConfirmDelete--> */}
      </React.Fragment>
    );
  }
}
