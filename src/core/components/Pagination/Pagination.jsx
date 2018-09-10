import React from "react";
import PropTypes from "prop-types";
import Button from "react-md/lib/Buttons/Button";
import "./Pagination.css";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };

    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  render() {
    const itemsPerPage = this.props.itemsPerPage || 6;
    let items = React.Children.toArray(this.props.children);
    const numPages = Math.round(items.length / itemsPerPage);
    const leftDisabled = this.state.currentPage === 1 ? true : false;
    const rightDisabled = this.state.currentPage === numPages ? true : false;
    items = items.slice(
      (this.state.currentPage - 1) * itemsPerPage,
      this.state.currentPage * itemsPerPage
    );

    let pageButtons = [];
    for (let i = 1; i <= numPages; i++) {
      const isCurrent = i === this.state.currentPage ? true : false;
      pageButtons.push(
        <Button
          flat={!isCurrent}
          raised={isCurrent}
          primary={isCurrent}
          className="paginate__buttons-right"
          onClick={() => this.setState({ currentPage: i })}
          key={i}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="paginate">
        <div className={this.props.className}>{items}</div>
        <div className="paginate__buttons">
          <Button
            icon
            className="paginate__buttons-left"
            tooltipLabel="Previous"
            tooltipPosition="top"
            tooltipDelay={1000}
            disabled={leftDisabled}
            onClick={this.onPreviousClick}
          >
            chevron_left
          </Button>
          <div className="paginate__numbuttons">{pageButtons}</div>
          <Button
            icon
            className="paginate__buttons-right"
            tooltipLabel="Next"
            tooltipPosition="top"
            tooltipDelay={1000}
            disabled={rightDisabled}
            onClick={this.onNextClick}
          >
            chevron_right
          </Button>
        </div>
      </div>
    );
  }

  onPreviousClick() {
    const previousPage = this.state.currentPage - 1;
    this.setState({
      currentPage: previousPage
    });
  }

  onNextClick() {
    const nextPage = this.state.currentPage + 1;
    this.setState({
      currentPage: nextPage
    });
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  className: PropTypes.string
};
