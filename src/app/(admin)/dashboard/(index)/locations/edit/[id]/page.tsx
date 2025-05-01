import { redirect } from "next/navigation";
import { getLocation } from "../../lib/actions";
import FormLocation from "../../_components/form-location";

type Tparams = {
  id: string;
};

interface EditPageProps {
  params: Tparams;
}

export default async function EditPage({ params }: EditPageProps) {
  const data = await getLocation(params.id);
  if (!data) {
    return redirect("/dashboard/locations");
  }
  return <FormLocation type="EDIT" data={data} />;
}
