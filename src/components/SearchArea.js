import React from "react";
import "../css/style.css";

export default class SearchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <input type="submit" value="GIFを検索" />
        </form>
      </div>
    );
  }

  handleChange = event => {
    const searchText = event.target.value;
    this.setState({ searchText: searchText });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchGif(this.state.searchText);
    this.setState({ searchText: "" });
  };
}
