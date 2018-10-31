import React from "react";
import PropTypes from "prop-types";
import Link from "core/containers/Link";
import Button from "react-md/lib/Buttons/Button";
import Card from "core/components/Card";
import "./DeleteBlogPost.css";

export default class DeleteBlogPost extends React.Component {
  render() {
    return (
      <Card className="deleteblogpost">
        <h1>Delete Blogpost</h1>
        <div>Are you sure you want to delete this blogpost?</div>
        <div className="deleteblogpost_actions">
          <Link to={`/blog/${this.props.id}`}>
            <Button raised={true}>Cancel</Button>
          </Link>
          <Button
            raised={true}
            secondary
            onClick={this.props.onDeleteButtonClick}
          >
            Delete
          </Button>
        </div>
      </Card>
    );
  }
}

DeleteBlogPost.propTypes = {
  id: PropTypes.number.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired
};
