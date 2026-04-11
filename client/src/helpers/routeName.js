export const RouteIndex = "/";
export const RouteSignUp = "/sign-up";
export const RouteSignIn = "/sign-in";
export const RouteProfile = "/profile";
export const RouteCategoriesDetails = "/categories";
export const RouteCategoriesAdd = "/categories/add";

export const dynamicCategories = (categoryId) => {
  if (categoryId) {
    return `/categories/edit/${categoryId}`;
  } else {
    return `/categories/edit/:categoryId`;
  }
};

export const RouteCategoriesEdit = dynamicCategories();

//  ERROR PAGE
export const RouteErrorPage = "/*";
