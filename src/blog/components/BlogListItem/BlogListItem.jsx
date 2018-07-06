import React from "react";
import PropTypes from "prop-types";
import Card from "core/components/Card";
import Link from "core/components/Link";
import TagChip from "blog/components/TagChip";
import "./BlogListItem.css";

class BlogListItem extends React.PureComponent {
  render() {
    return (
      <Card className="bloglistitem">
        <div className="bloglistitem__heading">
          <Link to={`/blog/${this.props.id}`} className="bloglistitem__link">
            <span className="bloglistitem__title">{this.props.title}</span>
          </Link>
          <div className="bloglistitem__date">{this.props.date}</div>
        </div>
        <div className="bloglistitem__tags">
          {this.props.tags && this.getTags()}
        </div>
      </Card>
    );
  }

  getTags() {
    return this.props.tags.map(tag => {
      return (
        <TagChip
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
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  onTagClick: PropTypes.func
};

export default BlogListItem;
