import React from "react";
import PropTypes from "prop-types";
import Link from "core/containers/Link";
import Button from "react-md/lib/Buttons/Button";
import "./Pagination.css";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.paginateTopRef = React.createRef();
  }

  render() {
    const itemsPerPage = this.props.itemsPerPage || 6;
    let items = React.Children.toArray(this.props.children);
    const numPages = Math.round(items.length / itemsPerPage) || 1;
    const showLeft = this.props.page === 1 ? false : true;
    const showRight = this.props.page === numPages ? false : true;

    items = items.slice(
      (this.props.page - 1) * itemsPerPage,
      this.props.page * itemsPerPage
    );

    const pageButtons = [];
    for (let i = 1; i <= numPages; i++) {
      const isCurrent = i === this.props.page ? true : false;
      pageButtons.push(
        <Link
          to={this.props.location.pathname}
          search={this.getSearchParams(i)}
          disabled={isCurrent}
        >
          <Button
            primary={isCurrent}
            className="md-btn--icon md-icon"
            onClick={() => this.handlePageClick()}
            key={i}
          >
            {i}
          </Button>
        </Link>
      );
    }

    return (
      <div className="paginate" ref={this.paginateTopRef}>
        <div className={this.props.className}>{items}</div>
        <div className="paginate__buttons">
          <Link
            to={this.props.location.pathname}
            search={this.getSearchParams(this.props.page - 1)}
            disabled={!showLeft}
          >
            <Button
              icon
              iconBefore={false}
              iconChildren="chevron_left"
              className="paginate__button-left"
              tooltipLabel="Previous"
              tooltipPosition="top"
              tooltipDelay={1000}
              onClick={() => this.handlePageClick()}
            />
          </Link>
          <div className="paginate__numbuttons">{pageButtons}</div>
          <Link
            to={this.props.location.pathname}
            search={this.getSearchParams(this.props.page + 1)}
            disabled={!showRight}
          >
            <Button
              icon
              iconChildren="chevron_right"
              className="paginate__button-right"
              tooltipLabel="Next"
              tooltipPosition="top"
              tooltipDelay={1000}
              onClick={() => this.handlePageClick()}
            />
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Creates a Search Params witht the page param set to the given pageNum.
   */
  getSearchParams(pageNum) {
    const searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("page", pageNum);
    return searchParams.toString();
  }

  /**
   * Handle clicking of a page button
   */
  handlePageClick() {
    this.scrollTop();
  }

  /**
   * Scroll to the top of pagination
   */
  scrollTop() {
    const paginateClientRect = this.paginateTopRef.current.getBoundingClientRect();
    window.scrollTo(paginateClientRect.x, paginateClientRect.y);
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  handlePageChange: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
