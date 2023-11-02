import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Pagination({
  setCurrentPage,
  currentPage,
  prevPage,
  nextPage,
  noOfPages,
  noOfProducts,
  children,
}) {
  //


  return (
    <div>
      <div>
        <Button
          mr={2}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          isDisabled={!prevPage}
        >
          prev
        </Button>

        {Array.from({ length: noOfPages }, (_, index) => {
          const page = index + 1;
          return (
            <Button
              key={page}
              mr={2}
              onClick={() => setCurrentPage(page)}
              variant={page === currentPage ? "outline" : "solid"}
            >
              {page}
            </Button>
          );
        })}
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          isDisabled={!nextPage}
        >
          next
        </Button>
      </div>
      {children}
    </div>
  );
}

export default Pagination;
