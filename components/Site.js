import React, { Component, PropTypes } from 'react';

/*
 * The Site component has two roles:
 *  - It is the parent component of the main elements of the application: header, page and footer.
 *  - It is responsible for issuing any requests for cards or datasets
 */
class Site extends Component {

  render() {
    const site = this.props.site;
    const cards = this.props.cards;
    const cardsets = this.props.componentCardsets;
    let styles = {};
    if (this.props.site.maxWidth) {
      styles = {maxWidth:this.props.site.maxWidth};
    }
    return (
      <div className="container" style={styles}>
        <p> I am here </p>
      </div>
    );
  }
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
};

export default Site;
