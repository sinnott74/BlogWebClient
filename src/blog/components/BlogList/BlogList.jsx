import React from "react";
import PropTypes from "prop-types";
import BlogListItem from "blog/components/BlogListItem";
import Spinner from "core/components/Spinner";
import TagChip from "blog/components/TagChip";
import "./BlogList.css";

export default class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTags: []
    };
    this.addFilterTag = this.addFilterTag.bind(this);
    this.removeFilterTag = this.removeFilterTag.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (this.props.blogPosts.length === 0) {
      return <Spinner />;
    }
    const filteredBlogPosts = this.filterBlogPosts();
    const blogPosts = filteredBlogPosts.map(blogPost => {
      return (
        <BlogListItem
          key={blogPost.id}
          {...blogPost}
          onTagClick={this.addFilterTag}
        />
      );
    });

    return (
      <div className="bloglist">
        {this.getFilterTags()}
        {blogPosts}
      </div>
    );
  }

  addFilterTag(tagName) {
    if (!this.state.filterTags.includes(tagName)) {
      this.setState({ filterTags: [...this.state.filterTags, tagName] });
    }
  }

  removeFilterTag(tagName) {
    this.setState({
      filterTags: this.state.filterTags.filter(filterTag => {
        return filterTag !== tagName;
      })
    });
  }

  filterBlogPosts() {
    if (this.state.filterTags.length) {
      const filterTags = this.state.filterTags;
      return this.props.blogPosts.filter(blogpost => {
        if (!blogpost.tags) {
          return false;
        }

        const blogpostTags = blogpost.tags.map(tag => {
          return tag.name;
        });
        return filterTags.every(filterTag => {
          return blogpostTags.includes(filterTag);
        });
      });
    }
    return this.props.blogPosts;
  }

  getFilterTags() {
    const tags = this.state.filterTags.map(tag => {
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
  ).isRequired
};
