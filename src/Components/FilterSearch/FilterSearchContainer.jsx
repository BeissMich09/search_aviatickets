import React from "react";
import { connect } from "react-redux";
import {
  getData,
  getSortArr,
  setFilterDirect,
  setFilterTransfer,
} from "../../redux/data-reducer";
import FilterSearch from "./FilterSearch";

class FilterSearchContainer extends React.Component {
  sortArray = (array, value) => {
    let a;
    if (value === 2) {
      a = array.slice().sort(function (a, b) {
        if (+a.flight.price.total.amount > +b.flight.price.total.amount)
          return -1;
        if (+a.flight.price.total.amount < +b.flight.price.total.amount)
          return 1;
        return 0;
      });
    } else if (value === 1) {
      a = array.slice().sort(function (a, b) {
        if (+a.flight.price.total.amount > +b.flight.price.total.amount)
          return 1;
        if (+a.flight.price.total.amount < +b.flight.price.total.amount)
          return -1;
        return 0;
      });
    } else if (value === 3) {
      a = array.slice().sort(function (a, b) {
        if (
          a.flight.legs[0].duration + a.flight.legs[1].duration >
          b.flight.legs[0].duration + b.flight.legs[1].duration
        )
          return 1;
        if (
          a.flight.legs[0].duration + a.flight.legs[1].duration <
          b.flight.legs[0].duration + b.flight.legs[1].duration
        )
          return -1;
        return 0;
      });
    }
    return a;
  };

  filterArrayTickets = (direct, transfer) => {
    let filterTickets;
    if (direct === true && transfer === false) {
      filterTickets = this.props.data.filter((item) => {
        console.log(item.flight.legs[0].segments.length === 1);
        return item.flight.legs[0].segments.length === 1;
      });
    } else if (direct === false && transfer === true) {
      return (filterTickets = this.props.data.filter((item) => {
        console.log(item.flight.legs[0].segments.length === 2);
        return item.flight.legs[0].segments.length === 2;
      }));
    } else if (direct && transfer) {
      filterTickets = this.props.data;
    }
    console.log(filterTickets);
    return filterTickets;
  };

  render() {
    return (
      <FilterSearch
        getData={this.props.getData}
        sortArray={this.sortArray}
        value={this.props.value}
        data={this.props.data}
        getSortArr={this.props.getSortArr}
        filter={this.props.filter}
        setFilterDirect={this.props.setFilterDirect}
        setFilterTransfer={this.props.setFilterTransfer}
        filterArrayTickets={this.filterArrayTickets}
        sortData={this.props.sortData}
      />
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    value: state.dataReducer.value,
    data: state.dataReducer.data,
    sortData: state.dataReducer.sortData,
    filter: state.dataReducer.filter,
  };
};
export default connect(mapStateToProps, {
  getData,
  getSortArr,
  setFilterDirect,
  setFilterTransfer,
})(FilterSearchContainer);
