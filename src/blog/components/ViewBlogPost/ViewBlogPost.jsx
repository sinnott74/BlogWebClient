import React from "react";
import PropTypes from "prop-types";
import Link from "core/containers/Link";
import Button from "react-md/lib/Buttons/Button";
import Card from "core/components/Card";
import TagChip from "blog/components/TagChip";
import Markdown from "core/components/Markdown";
import ShareLinks from "blog/components/ShareLinks";
import ZoomableImage from "core/components/ZoomableImage";
import Helmet from "react-helmet";
import "./ViewBlogPost.css";

export default class ViewBlogPost extends React.Component {
  componentDidMount() {}

  render() {
    const img = this.props.imageurl ? (
      <ZoomableImage
        className="blogpost__image"
        src={this.props.imageurl}
        alt={this.props.title}
        title={this.props.title}
      />
    ) : null;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.title}</title>
          <meta name="keywords" content={this.getTagKeywords()} />
          {this.props.author && (
            <meta
              name="author"
              content={`${this.props.author.firstname} ${
                this.props.author.lastname
              }`}
            />
          )}
        </Helmet>
        <Card className="blogpost">
          <h1 className="blogpost__title">{this.props.title}</h1>
          {this.props.author && (
            <div className="blogpost__subtitle">{`${this.props.date} by ${
              this.props.author.firstname
            } ${this.props.author.lastname}`}</div>
          )}
          {this.props.tags && this.getTags()}
          <ShareLinks url={window.location.href} title={this.props.title} />
          {img}
          <Markdown
            markdown={this.props.text}
            className="blogpost__text"
            image={this.imageRenderer}
          />
          {this.props.showActions && this.getActions()}
        </Card>
      </React.Fragment>
    );
  }

  imageRenderer(src, title, alt) {
    return <ZoomableImage src={src} title={title} alt={alt} />;
  }

  getActions() {
    // logged in user = blog post owner
    if (
      this.props.user_id &&
      this.props.loggedInUserID === this.props.user_id
    ) {
      return (
        <div className="blogpost_actions">
          <Link to={`/blog/${this.props.id}/delete`}>
            <Button raised={true} secondary>
              Delete
            </Button>
          </Link>
          <Link to={`/blog/${this.props.id}/edit`}>
            <Button raised={true} primary>
              Edit
            </Button>
          </Link>
        </div>
      );
    }
  }

  getTags() {
    const tags = this.props.tags.map(tag => {
      return (
        <TagChip
          key={tag.name}
          tag={tag.name}
          onClick={() => {
            if (this.props.onTagClick) {
              this.props.onTagClick(tag.name);
            }
          }}
        />
      );
    });
    return <div className="blogpost_tags">{tags}</div>;
  }

  getTagKeywords() {
    if (this.props.tags) {
      return this.props.tags
        .map(tag => {
          return tag.name;
        })
        .join();
    }
    return "";
  }
}

ViewBlogPost.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired
  }),
  user_id: PropTypes.number.isRequired,
  loggedInUserID: PropTypes.number.isRequired,
  showActions: PropTypes.bool,
  imageurl: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  )
};
