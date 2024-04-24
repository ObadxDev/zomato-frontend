import Header from "./Header";
import { useParams } from "react-router-dom";
import "../css/search.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let navigate = useNavigate();
  let { meal_id, meal_name } = useParams();
  let [location, setLocation] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);
  let [filterOptions, setFilterOptions] = useState({ meal_type: meal_id });

  let getLocationList = async () => {
    try {
      let url =
        "https://zomato-backend-xtmi.onrender.com/api/get-location-list";
      let response = await fetch(url, { method: "GET" });

      let data = await response.json();
      setLocation(data.result);
    } catch (error) {}
  };

  const getFilterData = async () => {
    try {
      let url = "https://zomato-backend-xtmi.onrender.com/api/filter";
      let { data } = await axios.post(url, { ...filterOptions });
      setRestaurantList(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
      alert("server error");
    }
  };

  const filter = async (type, event) => {
    let { value } = event.target;
    switch (type) {
      case "loc":
        if (value === "") {
          delete filterOptions.location;
        } else {
          filterOptions["location"] = value;
        }
        break;

      case "sort":
        filterOptions["sort"] = value;
        break;

      case "cuisine":
        if (event.target.checked === true) {
          if (filterOptions["cuisine_id"] !== undefined) {
            let isIncluded = filterOptions["cuisine_id"].includes(
              Number(value)
            );
            if (isIncluded === false) {
              filterOptions["cuisine_id"] = [
                ...filterOptions["cuisine_id"],
                Number(value),
              ];
            }
          } else {
            filterOptions["cuisine_id"] = [Number(value)];
          }
        } else {
          let cuisine = filterOptions["cuisine_id"].filter(
            (id) => Number(value) !== id
          );
          if (cuisine.length === 0) {
            delete filterOptions.cuisine;
          } else {
            filterOptions["cuisine_id"] = [...cuisine];
          }
        }

        break;
      default:
        break;
    }
    setFilterOptions({ ...filterOptions });
  };
  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    getFilterData();
  }, [filterOptions]);

  return (
    <main className="container-fluid">
      <section className="row bg-danger">
        <Header bgColor="bg-danger" />
      </section>
      {/* 2nd section */}
      <section className="row">
        <section className="col-11 m-auto col-md-11 col-lg-10">
          <p className="my-2 fs-2 fw-bold">{meal_name} Places in Near-By</p>
          <section className="row gap-5">
            {/* filter */}
            <section className="col-lg-3 col-md-4 col-12 shadow bg-white p-2 px-2 mb-lg-5 mb-md-5">
              <p className="fw-bold mb-2 d-none d-lg-flex d-md-flex">Filter</p>
              <p
                className="fw-bold mb-2 d-lg-none d-md-none d-flex justify-content-between"
                data-bs-toggle="collapse"
                data-bs-target="#search"
              >
                <span>Filter/Sort</span> <span className="fa fa-eye" />
              </p>
              {/*hide*/}
              <aside id="search" className="collapse d-lg-block d-md-block">
                <div>
                  <label className="form-label">Select Location</label>
                  <select
                    name
                    id
                    className="form-select rounded-0"
                    onChange={(event) => filter("loc", event)}
                  >
                    <option value="">Select</option>
                    {location.map((loc) => {
                      return (
                        <option value={loc.location_id} key={loc._id}>
                          {loc.name}, {loc.city}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="my-2">
                  <label className="form-label fw-bold">Cuisine</label>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={1}
                      onChange={(event) => filter("cuisine", event)}
                      disabled
                    />
                    <label className="form-check-label">North Indian</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={2}
                      onChange={(event) => filter("cuisine", event)}
                      disabled
                    />
                    <label className="form-check-label">South Indian</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={3}
                      onChange={(event) => filter("cuisine", event)}
                      disabled
                    />
                    <label className="form-check-label">Chinese</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={4}
                      onChange={(event) => filter("cuisine", event)}
                      disabled
                    />
                    <label className="form-check-label">Fast food</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={5}
                      onChange={(event) => filter("cuisine", event)}
                      disabled
                    />
                    <label className="form-check-label">Street food</label>
                  </div>
                </div>
                <div className="my-2">
                  <label className="form-label fw-bold ">Cost For Two</label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="costForTwo"
                      className="form-check-input"
                      disabled
                    />
                    <label className="form-check-label">Less than 500</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="costForTwo"
                      className="form-check-input"
                      disabled
                    />
                    <label className="form-check-label">500 to 1000</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="costForTwo"
                      className="form-check-input"
                      disabled
                    />
                    <label className="form-check-label">1000 to 1500</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="costForTwo"
                      className="form-check-input"
                      disabled
                    />
                    <label className="form-check-label">1500 to 2000</label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="costForTwo"
                      className="form-check-input"
                      disabled
                    />
                    <label className="form-check-label">2000+</label>
                  </div>
                </div>
                <div className="my-2">
                  <label className="form-label fw-bold ">Sort</label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="sort"
                      className="form-check-input"
                      value="1"
                      onChange={(event) => filter("sort", event)}
                      disabled
                    />
                    <label className="form-check-label">
                      Price low to high
                    </label>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="sort"
                      className="form-check-input"
                      value="-1"
                      onChange={(event) => filter("sort", event)}
                      disabled
                    />
                    <label className="form-check-label">
                      Price high to low
                    </label>
                  </div>
                </div>
              </aside>
              {/* hide */}
            </section>
            {/* restaurant */}
            <section className="col-lg-8 col-md-7 px-0 px-lg-2 px-md-2">
              {restaurantList.map((restaurant, index) => {
                return (
                  <section
                    className="shadow bg-white p-3 px-4 mb-3"
                    key={restaurant._id}
                    onClick={() => navigate("/restaurant/" + restaurant._id)}
                  >
                    <section className="d-flex gap-3 align-items-center">
                      <img
                        src="/images/assets/dinner.png"
                        className="restaurant-image"
                        alt=""
                      />
                      <section>
                        <p className="fs-3 fw-bold text-dark-blue">
                          {restaurant.name}
                        </p>
                        <p className="fw-bold text-dark-blue">
                          {restaurant.locality}
                        </p>
                        <p className="text-muted">{restaurant.city}</p>
                      </section>
                    </section>
                    <hr />
                    <section className="d-flex gap-5">
                      <section>
                        <p>CUISINES:</p>
                        <p>COST FOR TWO</p>
                      </section>
                      <section className="fw-bold">
                        <p>
                          {restaurant.cuisine
                            .map((value, index) => {
                              return value.name;
                            })
                            .join(",  ")}
                        </p>
                        <p>{restaurant.min_price}</p>
                      </section>
                    </section>
                  </section>
                );
              })}

              <section>
                <ul className="list-unstyled d-flex justify-content-center gap-4 zomato-paging">
                  <li>
                    <span className="fa fa-angle-left" />
                  </li>
                  <li className="zomato-paging-active">1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>
                    <span className="fa fa-angle-right" />
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Search;
