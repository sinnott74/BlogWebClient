import React from "react";
import PropTypes from "prop-types";
import BlogListItem from "blog/components/BlogListItem";
import Spinner from "core/components/Spinner";
import TagChip from "blog/components/TagChip";
import "./BlogList.css";

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.addFilterTag = this.addFilterTag.bind(this);
    this.removeFilterTag = this.removeFilterTag.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
    this.props.loadFilterTagsFromURL();
    this.unlisten = this.props.history.listen(() => {
      this.props.loadFilterTagsFromURL();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    if (this.props.blogPosts.length === 0) {
      return <Spinner />;
    }
    const blogPosts = this.props.blogPosts.map(blogPost => {
      return (
        <BlogListItem
          key={blogPost.id}
          {...blogPost}
          onTagClick={this.addFilterTag}
        />
      );
    });

    return (
      <div>
        {this.getFilterTags()}
        <div className="bloglist">{blogPosts}</div>
      </div>
    );
  }

  addFilterTag(tagName) {
    this.props.addFilterTag(tagName);
  }

  removeFilterTag(tagName) {
    this.props.removeFilterTag(tagName);
  }

  getFilterTags() {
    const tags = this.props.filterTags.map(tag => {
      return (
        <TagChip tag={tag} key={tag} onClick={this.removeFilterTag} removable />
      );
    });
    if (tags.length) {
      return <div className="bloglist_filtertags">Filter: {tags}</div>;
    }
  }
}

BlogList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  blogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      author: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired
      }),
      user_id: PropTypes.number.isRequired,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  filterTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  getFilterTags: PropTypes.func.isRequired,
  addFilterTag: PropTypes.func.isRequired,
  removeFilterTag: PropTypes.func.isRequired
};
