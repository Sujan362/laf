import React, { Component } from "react";
import Moment from "react-moment";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ItemDeleteModal from "./ItemDeleteModal";
import EditModal from "./EditModal";

export default class MyItem extends Component {
  state = {
    title: this.props.myItem.title,
    description: this.props.myItem.description,
    location: this.props.myItem.found_location,
    file: null,
  };

  onSubmit = (e) => {
    if (this.state.file === null) {
      var url = `/messages/updateItemWithoutImage?itemId=${this.props.myItem.id}&title=${this.state.title}&description=${this.state.description}&location=${this.state.location}`;
      axios.put(`${url}`).then((res) => window.location.reload(false));
    } else {
      var datetimestamp = Date.now();
      var fileName = this.state.file.name;
      var imageName = datetimestamp + fileName;
      var url = `/messages/updateItem?itemId=${this.props.myItem.id}&title=${this.state.title}&description=${this.state.description}&location=${this.state.location}&image=${imageName}`;
      axios.put(`${url}`);
      const fd = new FormData();
      fd.append("image", this.state.file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`images?newName=${imageName}`, fd, config)
        .then((res) => window.location.reload(false));
    }
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onChangeLocation = (e) => {
    this.setState({ location: e.target.value });
  };
  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  populateState = (e) => {
    this.setState({
      title: this.props.myItem.title,
      description: this.props.myItem.description,
      location: this.props.myItem.found_location,
    });
  };

  deleteItem = (e) => {
    const url = `/messages/deleteItem?itemId=${this.props.myItem.id}`;
    axios.put(`${url}`);
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      var url = `/StudentHome/myItems`;
      if (this.props.userType === "ADMIN") {
        url = "/AdminHome/myItems";
      }
      return <Redirect push to={url} />;
    }
    var deleteModal = `deleteModal${this.props.myItem.id}`;
    var primaryDeleteModal = `#${deleteModal}`;
    var editModal = `editModal${this.props.myItem.id}`;
    var primaryEditModal = `#${editModal}`;
    return (
      <React.Fragment>
        <div class="col-sm-4" id="cardmargin">
          <div class="card">
            <img
              class="img-responsive"
              src={require(`../assets/images/${this.props.myItem.image}`)}
            />

            <div class="card-body">
              <h4 class="card-title">
                <strong>{this.props.myItem.title}</strong>
              </h4>
              <p class="card-text" id="card-date">
                Posted on:
                <Moment format="YYYY/MM/DD hh:mma">
                  {this.props.myItem.date}
                </Moment>
              </p>
              <a
                href="#!"
                class="orange-text "
                style={{ textDecoration: "None" }}
              ></a>
              <button
                data-toggle="modal"
                data-target={primaryEditModal}
                onClick={this.populateState}
                class="btn btn-primary"
                id="founditbtnmd"
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>
              <button
                data-toggle="modal"
                data-target={primaryDeleteModal}
                class="btn btn-primary"
                id="founditbtnmd"
              >
                Delete
              </button>
              <ItemDeleteModal
                deleteModal={deleteModal}
                deleteItem={this.deleteItem}
              />
              <EditModal
                editModal={editModal}
                myItem={this.props.myItem}
                title={this.state.title}
                description={this.state.description}
                location={this.state.location}
                onSubmit={this.onSubmit}
                onChangeTitle={this.onChangeTitle}
                onChangeDescription={this.onChangeDescription}
                onChangeLocation={this.onChangeLocation}
                onChangeFile={this.onChangeFile}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
