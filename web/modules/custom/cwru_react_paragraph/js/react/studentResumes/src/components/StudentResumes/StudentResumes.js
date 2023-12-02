import React, {Component} from 'react';
import Card from '../Card';

//based on article
// https://betterprogramming.pub/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142

class StudentResumes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      activeList: [],
      unfiltered: [],
      passingTags: {
        searchStatus: {
          fullTime: false,
          intern: false
        },
        careerInterest: {
          accounting: false,
          consulting: false,
          dataAnalytics: false,
          finance: false,
          management: false,
          infoTech: false,
          logistics: false,
          marketing: false,
          operations: false,
          other: false,
          productManage: false
        },
        industryInterest: {
          consulting: false,
          consumerGoods: false,
          energy: false,
          financialServ: false,
          healthcare: false,
          nonProfit: false,
          other: false,
          tech: false
        },
        geoInterest: {
          USA: false,
          international: false,
          midwest: false,
          northeast: false,
          west: false
        }
      }
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e, filterProp) => {
    console.log("FILTER clicked", e.target.dataset.name);

    const name = e.target.value;
    this.setState(prevState => ({
      passingTags: {
        ...prevState.passingTags,
        [filterProp]: {
          ...prevState.passingTags[filterProp],
          [name]: !prevState.passingTags[filterProp][name]
        }
      }
    }))
  }

  // **************** Collect all keys and Filter ****************
// This function collects ALL keys that have true as a value, then create a new
// obj to compare to filter.
  filteredCollected = () => {
    const collectedTrueKeys = {
      searchStatus: [],
      careerInterest: [],
      industryInterest: [],
      geoInterest: []
    };
    const {
      searchStatus,
      careerInterest,
      industryInterest,
      geoInterest
    } = this.state.passingTags;
    for (let statusKey in searchStatus) {
      if (searchStatus[statusKey]) {
        collectedTrueKeys.searchStatus.push(statusKey);
      }
    }
    for (let careerKey in careerInterest) {
      if (careerInterest[careerKey]) {
        collectedTrueKeys.careerInterest.push(careerKey);
      }
    }
    for (let industryKey in industryInterest) {
      if (industryInterest[industryKey]) {
        collectedTrueKeys.industryInterest.push(industryKey);
      }
    }
    for (let regionKey in geoInterest) {
      if (geoInterest[regionKey]) {
        collectedTrueKeys.geoInterest.push(regionKey);
      }
    }
    return collectedTrueKeys;
  };

  multiPropsFilter = (products, filters) => {
    const filterKeys = Object.keys(filters);
    return products.filter(product => {

      return filterKeys.every(key => {
        if (!filters[key].length) {
          return true;
        }
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          return product[key].some(keyEle => {
            for (let i = 0; i < keyEle.length; i++) {
              if (filters[key].includes(keyEle)) {
                return true
              }
            }
          });
        }

        return filters[key].includes(product[key]);
      });
    });
  };


  // **************** SEARCH Filter ****************
  searchProducts = () => {
    const filteredProducts = this.multiPropsFilter(
      this.state.resumeList,
      this.filteredCollected()
    );
    return filteredProducts.filter(product => {
      return product
      //   .name
      //     .toLowerCase()
      //     .includes(this.state.passingTags.search.inputTerm);
    });
  };

  renderItems() {
    return <Card items={this.searchProducts()}/>
  }

  render() {
    return (
      <div id="container">
        <div id="filter">
          <section>
            <div id="filter-text">Filter matches for Career Interest areas
              (checked items are included)
            </div>
            <h6 id="filter-header">Search Status</h6>
            <div id="search-statuses" data-group="Search-Statuses">
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "searchStatus")}
                type="checkbox" data-name="fullTime"
                name="search-status-checkbox"
                value="Seeking Full-Time Position"/> Seeking Full-Time Position</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "searchStatus")}
                type="checkbox" data-name="intern" name="search-status-checkbox"
                value="Seeking Internship"/> Seeking Internship</label>
              <br/>
            </div>

            <h6 id="filter-header">Career Interests</h6>
            <div id="career-interests" data-group="Career-Interests">
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="accounting"
                name="career-interest-checkbox" value="Accounting"/> Accounting</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="consulting"
                name="career-interest-checkbox" value="Consulting"/> Consulting</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="dataAnalytics"
                name="career-interest-checkbox"
                value="Data &amp; Analytics"/> Data &amp; Analytics</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="finance"
                name="career-interest-checkbox"
                value="Finance"/> Finance</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="management"
                name="career-interest-checkbox"
                value="General Management/Leadership Development Programs"/> General
                Management/Leadership Development Programs</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="infoTech"
                name="career-interest-checkbox"
                value="Information Technology"/> Information Technology</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="logistics"
                name="career-interest-checkbox"
                value="Logistics &amp; Supply Chain"/> Logistics &amp; Supply
                Chain</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="marketing"
                name="career-interest-checkbox"
                value="Marketing"/> Marketing</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="operations"
                name="career-interest-checkbox" value="Operations"/> Operations</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="other"
                name="career-interest-checkbox" value="Other"/> Other</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "careerInterest")}
                type="checkbox" data-name="productManage"
                name="career-interest-checkbox"
                value="Product Management"/> Product Management</label>
              <br/>
            </div>

            <h6 id="filter-header">Industry Interests</h6>
            <div id="industry-interests" data-group="Industry-Interests">
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="consulting"
                name="industry-interest-checkbox"
                value="Consulting"/> Consulting</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="consumerGoods"
                name="industry-interest-checkbox"
                value="Consumer Products Goods"/> Consumer Products
                Goods</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="energy"
                name="industry-interest-checkbox"
                value="Energy"/> Energy</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="financialServ"
                name="industry-interest-checkbox"
                value="Financial Services"/> Financial Services</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="healthcare"
                name="industry-interest-checkbox"
                value="Healthcare"/> Healthcare</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="nonProfit"
                name="industry-interest-checkbox"
                value="Non-Profit/Government"/> Non-Profit/Government</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="other"
                name="industry-interest-checkbox" value="Other"/> Other</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "industryInterest")}
                type="checkbox" data-name="tech"
                name="industry-interest-checkbox"
                value="Technology"/> Technology</label>
              <br/>
            </div>

            <h6 id="filter-header">Region</h6>
            <div id="geographic-interests" data-group="Geographic-Interests">
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "geoInterest")}
                type="checkbox" data-name="USA"
                name="geographic-interest-checkbox"
                value="Anywhere in the US"/> Anywhere in the US</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "geoInterest")}
                type="checkbox" data-name="international"
                name="geographic-interest-checkbox"
                value="International (outside of the US)"/> International
                (outside of the US)</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "geoInterest")}
                type="checkbox" data-name="midwest"
                name="geographic-interest-checkbox"
                value="Midwest"/> Midwest</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "geoInterest")}
                type="checkbox" data-name="northeast"
                name="geographic-interest-checkbox"
                value="Northeast"/> Northeast</label>
              <br/>
              <label id="filter-label"><input
                onClick={e => this.handleClick(e, "geoInterest")}
                type="checkbox" data-name="west"
                name="geographic-interest-checkbox" value="West"/> West</label>
              <br/>
            </div>
          </section>
        </div>
        <div id="active-resumes">
          {this.renderItems()}
        </div>
      </div>
    )
  };
};

export default StudentResumes;
