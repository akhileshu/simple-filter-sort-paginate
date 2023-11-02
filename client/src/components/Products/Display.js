import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "./Box";
import Drawer from "./FilterSortDrawer";
import Pagination from "./Pagination";

function Display() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);
  //
  // Initialize with min and max Price and default category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([1, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);
  const [noOfProducts, setNoOfProducts] = useState(null);
  const [priceSortOrder, setPriceSortOrder] = useState("");

  const fetch = async () => {
    try {
      // structure
      // Response.data={results,next,previous}
      const {
        data: { results, next, previous, totalProducts, totalPages },
      } = await axios.get(`http://localhost:4000/api`, {
        params: {
          searchQuery: searchQuery.trim(),
          selectedCategory,
          priceRange,
          page: currentPage,
          limit: 3,
          priceSortOrder: priceSortOrder || undefined,
        },
      });

      setData(results);
      setPrevPage(previous);
      setNextPage(next);
      setNoOfPages(totalPages);
      setNoOfProducts(totalProducts);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, [searchQuery, priceRange, selectedCategory, currentPage, priceSortOrder]);

  //whenever searchQuery / filters changes current page -> should be 1

  return (
    <>
      <div>
        <h1>Product Display</h1>
        {/* Search Input */}
        <p>total results: {noOfProducts}</p>
        <div>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* <button onClick={() => handleSearch()}>Search</button> */}
        </div>
        <Drawer
          setCurrentPage={setCurrentPage}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategory={selectedCategory}
          setPriceSortOrder={setPriceSortOrder}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Product List */}
        <Pagination
          noOfPages={noOfPages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          setCurrentPage={setCurrentPage}
        >
          {data.length !== 0 ? (
            <div className="products">
              {data.map((item, ind) => (
                <Box key={ind} item={item} />
              ))}
            </div>
          ) : (
            <h1>no products found ,try removing filters</h1>
          )}
        </Pagination>
      </div>
    </>
  );
}

export default Display;
