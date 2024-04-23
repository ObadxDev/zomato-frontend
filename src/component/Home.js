import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Home = () => {
  let [mealTypes, setMealtypes] = useState([]);
  let [placeholderText, setPlaceholderText] = useState("Get a location");
  let [location, setLocation] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);

  let navigate = useNavigate();

  let getMealTypes = async () => {
    try {
      let url =
        "https://zomato-backend-xtmi.onrender.com/api/get-meal-types-list";
      let response = await fetch(url, { method: "GET" });

      let data = await response.json();
      setMealtypes(data.result);
    } catch {
      alert("server Error");
    }
  };

  let getLocationList = async () => {
    try {
      setPlaceholderText("Getting Location List .......");
      setRestaurantList([]);
      let url =
        "https://zomato-backend-xtmi.onrender.com/api/get-location-list";
      let response = await fetch(url, { method: "GET" });

      let data = await response.json();
      setLocation(data.result);
      setPlaceholderText("Here is the location list!!!");
    } catch {
      setPlaceholderText("fail get location,try again");
    }
  };
  let getRestaurantListByLocationId = async (id, name, city) => {
    try {
      let url = `https://zomato-backend-xtmi.onrender.com/api//get-restaurant-list-by-location-id/${id}`;
      let response = await fetch(url, { method: "GET" });
      let data = await response.json();
      console.log(data);
      if (data.result.length === 0) {
        alert("No restaurant found in that Area");
      }
      setPlaceholderText(`${name},${city}`);
      setLocation([]);
      setRestaurantList(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  //
  //

  useEffect(() => {
    getMealTypes();
  }, []);
  console.log(mealTypes);

  return (
    <>
      <header className="container-fluid image">
        {/* <!-- navbar --> */}
        <Header />

        {/* <!-- logo --> */}
        <section className="row justify-content-center p-4">
          <p className="logo col-12 col-md-6 text-center">e!</p>
        </section>

        {/* <!-- para & search --> */}
        <section className="row">
          <p className="col-12 text-center fs-4 fw-bold text-white mb-lg-5">
            Find the best restaurants, cafes, and bars
          </p>
        </section>

        <section className="w-50 d-lg-flex d-md-flex mt-3 m-auto pb-5">
          <section className="w-50 location-list">
            <input
              type="text"
              placeholder={placeholderText}
              className="form-control mb-3 mb-lg-0 w-100 me-lg-3 py-2 px-3"
              readOnly
              onFocus={getLocationList}
            />

            <ul className="list-group w-100">
              {location.map((loc) => {
                return (
                  <li
                    className="list-group-item"
                    onClick={() =>
                      getRestaurantListByLocationId(
                        loc.location_id,
                        loc.name,
                        loc.city
                      )
                    }
                    key={loc._id}
                  >
                    {loc.name},{loc.city}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="w-75 location-list">
            <div className="w-100 input-group"></div>
            <input
              type="text"
              placeholder="Search for restaurants"
              className="form-control py-2 px-3"
              readOnly
            />
            <ul className="list-group w-100">
              {restaurantList.map((restaurant) => {
                return (
                  <li
                    className="list-group-item"
                    key={restaurant._id}
                    onClick={() => navigate("/restaurant/" + restaurant._id)}
                  >
                    <img
                      src={`/images/${restaurant.image}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      className="me-2"
                    />
                    {restaurant.name},{restaurant.city}
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </header>

      {/* <!-- section2 --> */}
      <main className="container-fluid px-5 py-5 search">
        <section className="row px-lg-3">
          <section className="offset-1 col-11 ">
            <p className="fs-3 fw-bold mb-0s dark">Quick Searches</p>
          </section>
        </section>
        <section className="row px-lg-3">
          <section className="offset-1 col-11">
            <p className="light">Discover restaurants by type of meal</p>
          </section>
        </section>

        <section className="row gap-lg-5 gap-md-3 gap-sm-3 d-flex justify-content-center">
          {mealTypes.map((value, index) => {
            return (
              <section
                key={value._id}
                onClick={() =>
                  navigate(`/search/${value.meal_type}/${value.name}`)
                }
                className="col-12 col-sm-5 col-lg-3 d-flex my-2 my-lg-3 p-0 shadow"
              >
                <img
                  src={`./images/${value.image}`}
                  alt="food"
                  className="food-img"
                />
                <section className="card">
                  <p className="fw-bold mb-1 dark">{value.name}</p>
                  <p className="light">{value.content}</p>
                </section>
              </section>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Home;
