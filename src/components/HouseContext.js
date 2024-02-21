import React, { createContext, useState, useEffect } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [category, setCategory] = useState("Category type (any)");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]);

  useEffect(() => {
    const allProperties = houses.map((house) => house.type);
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, [houses]);

  useEffect(() => {
    const allCategories = houses.map((house) => house.category);
    const uniqueCategories = ["Category (any)", ...new Set(allCategories)];
    setCategories(uniqueCategories);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (!isDefault(category) && !isDefault(property) && !isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.category === category && house.country === country && house.type === property;
        }
        return false;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price) && isDefault(category)) {
        return true;
      }

      if (!isDefault(category) && isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.category === category;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(category)) {
        return house.country === country;
      }

      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(category)) {
        return house.type === property;
      }

      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(category)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return true;
        }
        return false;
      }

      // 3 pairs combinations...
      if (!isDefault(category) && !isDefault(property) && !isDefault(country) && isDefault(price)) {
        return house.category === category && house.country === country && house.type === property;
      }

      if (!isDefault(category) && !isDefault(property) && isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.category === category && house.type === property;
        }
        return false;
      }

      if (!isDefault(category) && isDefault(property) && !isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.category === category && house.country === country;
        }
        return false;
      }

      if (isDefault(category) && !isDefault(property) && !isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property && house.country === country;
        }
        return false;
      }

      // 2 pairs combinations...
      if (!isDefault(category) && !isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.category === category && house.type === property;
      }

      if (!isDefault(category) && isDefault(property) && !isDefault(country) && isDefault(price)) {
        return house.category === category && house.country === country;
      }

      if (isDefault(category) && !isDefault(property) && !isDefault(country) && isDefault(price)) {
        return house.type === property && house.country === country;
      }

      if (!isDefault(category) && isDefault(property) && isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.category === category;
        }
        return false;
      }

      if (isDefault(category) && !isDefault(property) && isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
        return false;
      }

      if (isDefault(category) && isDefault(property) && !isDefault(country) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
        return false;
      }

      return false;
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
        category,
        setCategory,
        categories,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
