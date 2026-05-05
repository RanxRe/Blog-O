export const RouteIndex = "/";
export const RouteSignUp = "/sign-up";
export const RouteSignIn = "/sign-in";
export const RouteProfile = "/profile";
export const RouteCategoriesDetails = "/categories";
export const RouteCategoriesAdd = "/categories/add";
export const RouteCategoriesEdit = "/categories/edit/:categoryId";

export const getCategoryEditRoute = (categoryId) => `/categories/edit/${categoryId}`;

// export const RouteCategoriesEdit = dynamicCategories();

export const RouteBlog = "/blogs";
export const RouteBlogAdd = "/blogs/add";
export const RouteBlogEdit = (blogId) => {
  if (blogId) return `/blogs/edit/${blogId}`;
  else return `/blogs/edit/:blogId`;
};

export const RouteBlogDetails = (category, slug) => {
  if (!category || !slug) {
    return `/blog/:category/:slug`;
  } else return `/blog/${category}/${slug}`;
};

export const RouteBlogByCategory = (category) => {
  if (!category) {
    return `/blog/:category`;
  } else {
    return `/blog/${category}`;
  }
};

export const RouteSearch = (q) => {
  if (q) {
    return `/search?q=${q}`;
  } else {
    return `/search`;
  }
};

//  ERROR PAGE
export const RouteErrorPage = "/*";
