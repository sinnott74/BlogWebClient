import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import Link from "core/containers/Link";
import TagChip from "blog/components/TagChip";
import LazyImage from "core/components/LazyImage";
import "./BlogListItem.css";

class BlogListItem extends React.PureComponent {
  render() {
    if (this.props.tags) {
      var tagEl = <div className="bloglistitem__tags">{this.getTags()}</div>;
    }

    return (
      <Card className="bloglistitem">
        <Link
          to={`/blog/${this.props.id}`}
          className="bloglistitem__link "
          title={this.props.title}
        >
          <LazyImage
            className="blogpostitem__image"
            src={this.props.imageurl}
            title={this.props.title}
          />
        </Link>
        <div className="bloglistitem__heading">
          <Link
            to={`/blog/${this.props.id}`}
            className="bloglistitem__link"
            title={this.props.title}
          >
            <h2 className="bloglistitem__title">{this.props.title}</h2>
          </Link>
          <div className="bloglistitem__date">{this.props.date}</div>
          {tagEl}
        </div>
      </Card>
    );
  }

  getTags() {
    return this.props.tags.map((tag) => {
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
  }
}

BlogListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageurl: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onTagClick: PropTypes.func,
};

export default BlogListItem;
