import React, { Component } from "react";
import "../assets/css/ItemList.css";
import axios from "axios";
import { Redirect } from "react-router";

class ItemList extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    location: "",
    image: "",
    selectedFile: null,
  };

  onSubmit = (event) => {
    event.preventDefault();
    var datetimestamp = Date.now();
    var fileName = this.state.selectedFile.name;
    var imageName = datetimestamp + fileName;
    var thisType = this.props.itemType;
    if (this.props.userType === "ADMIN") {
      axios
        .post(
          `laf?uid=ADMIN&type=${thisType}&title=${this.state.title}&description=${this.state.description}&location=${this.state.location}&image=${imageName}`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } else {
      axios
        .post(
          `laf?uid=${this.props.userInfo.student_id}&type=${thisType}&title=${this.state.title}&description=${this.state.description}&location=${this.state.location}&image=${imageName}`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    }

    const fd = new FormData();
    fd.append("image", this.state.selectedFile);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post(`images?newName=${imageName}`, fd, config);
    this.setState({ redirect: true });
  };

  onChangeTitle = (e) => this.setState({ title: e.target.value });
  onChangeDescription = (e) => this.setState({ description: e.target.value });
  onChangeLocation = (e) => this.setState({ location: e.target.value });
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    if (this.state.redirect) {
      var url = "/StudentHome";
      if (this.props.userType === "ADMIN") {
        url = "/AdminHome";
      }
      return <Redirect push to={url} />;
    }
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            id="createbtn"
          >
            + Create Post
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header" id="modalheadcolor">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Create Post
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" class="white-text" id="x">
                      x
                    </span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      value={this.state.title}
                      onChange={this.onChangeTitle}
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
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                    ></textarea>
                    <br />
                    <label for="message-text" class="col-form-label">
                      Item Location
                    </label>
                    <textarea
                      required
                      class="form-control"
                      id="location"
                      value={this.state.location}
                      onChange={this.onChangeLocation}
                    ></textarea>
                    <br />
                    <label for="myFile">Select a file:</label>
                    <input
                      required
                      type="file"
                      onChange={this.fileChangedHandler}
                    ></input>
                  </div>
                </div>
                <div class="modal-footer">
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
                      type="button"
                      class="btn btn-primary waves-effect waves-light"
                      data-toggle="modal"
                      data-target="#modalConfirmDelete"
                      id="postitemmodal"
                    >
                      Post Item
                      <i class="fa fa-paper-plane ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!--Modal: modalConfirmDelete--> */}
          <div
            class="modal fade"
            id="modalConfirmDelete"
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
                  <p class="heading">Are you sure want to Post?</p>
                </div>
                {/* <!--Footer--> */}
                <div class="modal-footer flex-center">
                  <a
                    type="button"
                    class="btn btn-outline-danger waves-effect waves-danger"
                    data-dismiss="modal"
                    id="modalheadcolorfooter"
                  >
                    {" "}
                    No
                  </a>
                  <button
                    type="Submit"
                    value="Submit"
                    class="btn btn-outline-Primary"
                    id="modalsurefooter"
                  >
                    {" "}
                    Yes
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

export default ItemList;
