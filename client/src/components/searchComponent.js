import React from "react";
const SearchUser = (props) => {
  return (
    <div className="row searchROW">
      <div className="col-3">
        <h5>Search By </h5>
      </div>
      <div className="col-3">
        <select className="form-select" onChange={(e) => props.filterBy(e)}>
          {/* <option value="name">Name</option> */}
          <option value="PetName">Name</option>
          <option value="DateOfBirth">Age</option>
          <option value="PetType">Type</option>
          {/* <option value="mail">Mail</option> */}
          {/* <option value="phone">Phone</option> */}
          {/* <option value="age">Age</option> */}
        </select>
      </div>
      <div className="col-6">
        <input id="inputToSearch" type="text" onKeyUp={(e) => props.searchBy(e)} />
      </div>
    </div>
  );
};

export default SearchUser;
