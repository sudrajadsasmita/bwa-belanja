import getBrands from "../../brands/lib/data";
import getCategories from "../../categories/lib/data";
import getLocations from "../../locations/lib/data";
import FormProduct from "../_components/form-product";

export default async function CreatePage() {
  const categories = await getCategories();
  const brands = await getBrands();
  const location = await getLocations();
  return (
    <FormProduct brand={brands} category={categories} location={location} />
  );
}
