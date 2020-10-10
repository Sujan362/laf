import React, { Component } from "react";
import Moment from "react-moment";
import EditConfirmModal from "./EditConfirmModal";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class EditModal extends Component {
  render() {
    var editConfirm = `editConfirm${this.props.myItem.id}`;
    var primaryEditConfirm = `#${editConfirm}`;
    return (
      <React.Fragment>
        {/* <!--Modal: modalConfirmSendMessage--> */}
        <div
          class="modal fade"
          id={this.props.editModal}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            {/* <!--Content--> */}
            <div class="modal-content text-center">
              {/* <!--Header--> */}
              <div
                class="modal-header d-flex justify-content-center"
                id="modalsure"
              >
                <p class="heading">Make changes to the post.</p>
              </div>
              <div class="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      value={this.props.title}
                      onChange={this.props.onChangeTitle}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="message-text" class="col-form-label">
                      Item Information
                    </label>
                    <textarea
                      required
                      class="form-control"
                      id="description"
                      value={this.props.description}
                      onChange={this.props.onChangeDescription}
                    ></textarea>
                    <br />
                    <label for="message-text" class="col-form-label">
                      Item Location
                    </label>
                    <textarea
                      required
                      class="form-control"
                      id="location"
                      value={this.props.location}
                      onChange={this.props.onChangeLocation}
                    ></textarea>
                    <label for="myFile">Select a file:</label>
                    <input
                      required
                      type="file"
                      onChange={this.props.onChangeFile}
                    ></input>
                    <label />
                    <br />
                  </div>
                  <div class="modal-footer justify-content-center">
                    <a
                      type="button"
                      class="btn btn-outline-danger waves-effect waves-danger"
                      data-dismiss="modal"
                      id="modalheadcolorfooter"
                    >
                      Cancel
                    </a>
                    <a
                      data-toggle="modal"
                      data-target={primaryEditConfirm}
                      class="btn btn-primary waves-effect waves-light"
                      id="postitemmodal"
                    >
                      Make changes
                      <i class="fa fa-paper-plane ml-1"></i>
                    </a>
                  </div>
                </form>
                <EditConfirmModal
                  editConfirm={editConfirm}
                  onSubmit={this.props.onSubmit}
                />
              </div>
              {/* <!--Footer--> */}
            </div>
            {/* <!--/.Content--> */}
          </div>
        </div>

        {/* <!--Modal: modalConfirmDelete--> */}
      </React.Fragment>
    );
  }
}
