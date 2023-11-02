import Product from "../model/product.js";

export const fetchProducts = async (req, res) => {
  try {
    const {
      searchQuery,
      selectedCategory,
      priceRange,
      limit,
      page,
      priceSortOrder,
    } = req.query;

    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    // Create a filter for searching by name or description
    const searchFilter = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    };

    // Create a filter for price range
    const priceFilter = {
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    };

    // Create the base query
    const baseQuery = {
      $and: [searchFilter, priceFilter],
    };

    if (selectedCategory !== "All") {
      baseQuery.category = selectedCategory;
    }

    // Sorting options
    const sortOptions = {};

    if (priceSortOrder) {
      sortOptions.price = Number(priceSortOrder);
    }

    // Count the total number of products matching the filter
    const totalProducts = await Product.countDocuments(baseQuery);

    // Calculate the total pages
    const totalPages = Math.ceil(totalProducts / limitInt);

    // Calculate the skip value for efficient pagination
    const skip = (pageInt - 1) * limitInt;

    // Fetch and paginate the products
    const paginatedProducts = await Product.find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitInt);

    const results = {
      totalProducts,
      totalPages,
      results: paginatedProducts,
    };

    // Add pagination links
    if (pageInt < totalPages) {
      results.next = { page: pageInt + 1, limit: limitInt };
    }

    if (pageInt > 1) {
      results.previous = { page: pageInt - 1, limit: limitInt };
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching products." });
  }
};
