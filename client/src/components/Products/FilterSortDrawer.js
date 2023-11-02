import React, { useRef, useState } from "react";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Select,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

function DrawerExample({
  setCurrentPage,
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  priceSortOrder,
  setPriceSortOrder, // Add this prop
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localSelectCategory, setLocalSelectCategory] =
    useState(selectedCategory);
  const [localPriceSortOrder, setLocalPriceSortOrder] =
    useState(priceSortOrder); // Local state for sorting

  const handleSubmit = () => {
    setCurrentPage(1);
    setPriceRange(localPriceRange);
    setSelectedCategory(localSelectCategory);
    setPriceSortOrder(localPriceSortOrder); // Update the global state with sorting
    onClose();
  };

  const handleClear = () => {
    setPriceRange([1, 2000]);
    setSelectedCategory("All");
    setPriceSortOrder(null); // Clear the sorting
    onClose();
  };

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home Decor",
    "Toys",
    "Books",
    "Sports",
  ];

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Add Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter and Sort</DrawerHeader>
          <DrawerBody>
            <label htmlFor="selectCategory">Select Category</label>
            <Select
              id="selectCategory"
              value={localSelectCategory}
              onChange={(e) => setLocalSelectCategory(e.target.value)}
            >
              {categories.map((c, i) => (
                <option value={c} key={i}>
                  {c}
                </option>
              ))}
            </Select>

            {/* Price Range */}
            <Text mb={2}>
              Price Range: {localPriceRange[0]} - {localPriceRange[1]} ₹
            </Text>
            <RangeSlider
              aria-label={["min", "max"]}
              min={1}
              max={2000}
              defaultValue={priceRange}
              onChange={(newRange) => {
                setLocalPriceRange(newRange);
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>

            {/* Sort by Price */}
            <label htmlFor="sortByPrice">Sort By Price</label>
            <Select
              id="sortByPrice"
              value={localPriceSortOrder}
              onChange={(e) => setLocalPriceSortOrder(e.target.value)}
            >
              <option value="">Don't Sort</option>
              <option value="1">Low to High</option>
              <option value="-1">High to Low</option>
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={2} onClick={handleSubmit}>
              Apply Filters
            </Button>
            <Button colorScheme="red" onClick={handleClear}>
              Clear Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
