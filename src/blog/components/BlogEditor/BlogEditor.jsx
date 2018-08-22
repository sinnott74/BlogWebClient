import React from "react";
import PropTypes from "prop-types";
import TextField from "react-md/lib/TextFields/TextField";
import Tab from "react-md/lib/Tabs/Tab";
import Tabs from "react-md/lib/Tabs/Tabs";
import TabsContainer from "react-md/lib/Tabs/TabsContainer";
import CancelButton from "core/components/CancelButton";
import SubmitButton from "core/components/SubmitButton";
import TagChip from "blog/components/TagChip";
import "./BlogEditor.css";
import ViewBlogPost from "blog/components/ViewBlogPost";
import Card from "core/components/Card";

export default class BlogEditor extends React.Component {
  constructor(props) {
    super();

    this.state = {
      tags: [],
      ...props.blogpost
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...nextProps.blogpost,
      ...this.state
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { username, password } = this.state;
    // if (username && password) {
    //    this.props.handleLogin(username, password);
    // }

    this.props.handleSave(this.state);
  }

  render() {
    return (
      <TabsContainer
        className="blogeditor_container"
        panelClassName="md-grid blogeditor_tabpanel"
        colored
        swipeableViewsStyle={{ height: "100%", width: "100%" }}
        slideStyle={{ height: "100%" }}
      >
        <Tabs tabId="edit" centered className="blogeditor_tabs">
          <Tab label="Editor">
            <Card className="blogeditor_card">
              <TextField
                id="title"
                type="text"
                name="title"
                label="Title"
                helpText="Please enter a BlogPost title"
                helpOnFocus
                required
                value={this.state.title}
                autoComplete="off"
                maxLength={255}
                onChange={(title, e) => {
                  this.setState({
                    ...this.state,
                    title
                  });
                }}
              />
              <div className="blogeditor_tagchips">{this.getTagChips()}</div>
              <TextField
                id="tags"
                type="text"
                name="text"
                label="Add a Tag"
                helpText="Press Enter to add a Tag"
                helpOnFocus
                autoComplete="off"
                maxRows={1}
                maxLength={255}
                onKeyPress={this._handleTagKeyPress}
                ref={tagField => {
                  this.tagField = tagField;
                }}
              />
              <TextField
                id="imageurl"
                type="text"
                name="imageurl"
                label="Image Url"
                helpText="Please enter an image Url"
                helpOnFocus
                value={this.state.imageurl}
                autoComplete="off"
                maxLength={255}
                onChange={(imageurl, e) => {
                  this.setState({
                    ...this.state,
                    imageurl
                  });
                }}
              />
              <TextField
                id="text"
                type="text"
                name="text"
                label="Text"
                helpText="Markdown is allowed :)"
                helpOnFocus
                required
                rows={1}
                autoComplete="off"
                value={this.state.text}
                onChange={(text, e) => {
                  this.setState({
                    ...this.state,
                    text
                  });
                }}
              />
              <div className="blogeditor_buttons">
                <CancelButton link={`/blog/${this.props.id}`} />
                <SubmitButton
                  isSubmitting={this.props.isSubmitting}
                  onClick={this.handleSubmit}
                >
                  Save
                </SubmitButton>
              </div>
            </Card>
          </Tab>
          <Tab label="preview">
            <ViewBlogPost {...this.state} />
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }

  getTagChips = () => {
    return this.state.tags.map(tag => {
      return (
        <TagChip
          key={tag.name}
          tag={tag.name}
          onClick={this.removeTag}
          removable
        />
      );
    });
  };

  addTag = tagName => {
    if (
      !this.state.tags.some(tag => {
        return tag.name === tagName;
      })
    ) {
      const tag = {
        name: tagName
      };
      this.setState({
        ...this.state,
        tags: [...this.state.tags, tag]
      });
    }
  };

  removeTag = tagName => {
    this.setState({
      ...this.state,
      tags: this.state.tags.filter(storedTag => {
        return storedTag.name !== tagName;
      })
    });
  };

  _handleTagKeyPress = e => {
    if (e.key === "Enter") {
      const tag = this.tagField.value;
      const field = this.tagField.getField();
      field.value = "";
      if (tag) {
        this.addTag(tag);
      }
    }
  };
}

BlogEditor.propTypes = {
  handleSave: PropTypes.func.isRequired
};
