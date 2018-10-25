import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import marked from "marked";
import uuid from "uuid/v4";
import { renderToStaticMarkup } from "react-dom/server";
import { hydrate } from "react-dom";

// Prism
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-yaml";

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);

    // List of elements to be hydrated
    this.hydratableElements = {};

    // Renderer used during marked
    this.renderer = new marked.Renderer();

    // Default renderer
    this.defaultMarkedRenderer = new marked.Renderer();
  }

  render() {
    // Wrap render methods
    this.enhanceRenderMethods();
    return (
      <div
        className={classnames(this.props.className)}
        dangerouslySetInnerHTML={this.rawMarkup()}
      />
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.hydrate();
  }

  /**
   * React hydrate each element to be hydrated
   */
  hydrate() {
    for (const key in this.hydratableElements) {
      hydrate(this.hydratableElements[key], document.getElementById(key));
    }
  }

  rawMarkup() {
    // reset tracked hydratable elements
    this.hydratableElements = {};

    if (!this.props.markdown) {
      return;
    }

    const rawMarkup = marked(this.props.markdown, {
      renderer: this.renderer,
      sanitize: true,
      gfm: true,
      tables: true,
      highlight: function(code, lang) {
        if (Prism.languages[lang]) {
          const grammar = Prism.languages[lang];
          return Prism.highlight(code, grammar, lang);
        }
      }
    });
    return { __html: rawMarkup };
  }

  /**
   * This method loops through each render method on marked
   * and replaces it with the supplied prop.
   *
   * The component is given a unique ID
   * and added to the list to be hydrated.
   */
  enhanceRenderMethods() {
    for (const type in this.defaultMarkedRenderer) {
      if (!this.props[type]) {
        this.renderer[type] = this.defaultMarkedRenderer[type];
      } else {
        this.renderer[type] = (...args) => {
          const id = uuid();
          const component = this.props[type](...args);
          this.hydratableElements[id] = component;
          return `<div id=${id}>${renderToStaticMarkup(component)}</div>`;
        };
      }
    }
  }
}

/**
 * Markedjs renderer props acepted
 */
Markdown.propTypes = {
  markdown: PropTypes.string,
  className: PropTypes.string,
  code: PropTypes.func,
  blockquote: PropTypes.func,
  html: PropTypes.func,
  heading: PropTypes.func,
  hr: PropTypes.func,
  list: PropTypes.func,
  listitem: PropTypes.func,
  checkbox: PropTypes.func,
  paragraph: PropTypes.func,
  table: PropTypes.func,
  tablerow: PropTypes.func,
  tablecell: PropTypes.func,
  strong: PropTypes.func,
  em: PropTypes.func,
  codespan: PropTypes.func,
  br: PropTypes.func,
  del: PropTypes.func,
  link: PropTypes.func,
  image: PropTypes.func,
  text: PropTypes.func
};
