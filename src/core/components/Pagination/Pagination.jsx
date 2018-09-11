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
    this.paginateTopRef = React.createRef();
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

    const pageButtons = [];
    for (let i = 1; i <= numPages; i++) {
      const isCurrent = i === this.state.currentPage ? true : false;
      pageButtons.push(
        <Button
          flat={!isCurrent}
          raised={isCurrent}
          primary={isCurrent}
          className="paginate__button"
          onClick={() => this.setCurrentPage(i)}
          key={i}
        >
          {i}
        </Button>
      );
    }

    return (
      <div className="paginate" ref={this.paginateTopRef}>
        <div className={this.props.className}>{items}</div>
        <div className="paginate__buttons">
          <Button
            flat
            iconBefore={false}
            iconChildren="chevron_left"
            className="paginate__button-left"
            tooltipLabel="Previous"
            tooltipPosition="top"
            tooltipDelay={1000}
            disabled={leftDisabled}
            onClick={this.onPreviousClick}
          />
          <div className="paginate__numbuttons">{pageButtons}</div>
          <Button
            flat
            iconChildren="chevron_right"
            className="paginate__button-right"
            tooltipLabel="Next"
            tooltipPosition="top"
            tooltipDelay={1000}
            disabled={rightDisabled}
            onClick={this.onNextClick}
          />
        </div>
      </div>
    );
  }

  onPreviousClick() {
    this.setCurrentPage(this.state.currentPage - 1);
  }

  onNextClick() {
    this.setCurrentPage(this.state.currentPage + 1);
  }

  setCurrentPage(page) {
    if (page === this.state.currentPage) return;
    this.setState({
      currentPage: page
    });
    const paginateClientRect = this.paginateTopRef.current.getBoundingClientRect();
    window.scrollTo(paginateClientRect.x, paginateClientRect.y);
    if (this.props.onPageChange) {
      this.props.onPageChange(page);
    }
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
