import React from "react";
import PropTypes from "prop-types";
import marked from "marked";
import Link from "core/components/Link";
import Button from "react-md/lib/Buttons/Button";
import Card from "core/components/Card";
import "blog/components/TagChip";
import "./ViewBlogPost.css";
import TagChip from "blog/components/TagChip";

// Prism
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";

export default class ViewBlogPost extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Card className="blogpost">
        <h1 className="blogpost__title">{this.props.title}</h1>
        {this.props.author && (
          <div className="blogpost__subtitle">{`${this.props.date} by ${
            this.props.author.firstname
          } ${this.props.author.lastname}`}</div>
        )}
        {this.props.tags && this.getTags()}
        <div
          className="blogpost__text"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
        {this.props.showActions && this.getActions()}
      </Card>
    );
  }

  rawMarkup() {
    if (this.props.text) {
      const rawMarkup = marked(this.props.text, {
        sanitize: true,
        gfm: true,
        tables: true,
        // langPrefix: "language-",
        highlight: function(code, lang) {
          if (Prism.languages[lang]) {
            const grammar = Prism.languages[lang];
            return Prism.highlight(code, grammar, lang);
          }
        }
      });
      return { __html: rawMarkup };
    }
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
      return <TagChip key={tag.name} tag={tag.name} />;
    });
    return <div className="blogpost_tags">{tags}</div>;
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
  showActions: PropTypes.bool
};
