import { redirect } from "next/navigation";
import { getBrand } from "../../lib/actions";
import FormBrand from "../../_components/form-brand";

type Tparams = {
  id: string;
};

interface EditPageProps {
  params: Tparams;
}

export default async function EditPage({ params }: EditPageProps) {
  const data = await getBrand(params.id);
  if (!data) {
    return redirect("/dashboard/categories");
  }
  return <FormBrand type="EDIT" data={data} />;
}
