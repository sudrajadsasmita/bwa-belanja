import { ActionResult } from "@/types";
import { useActionState } from "react";
import { deleteLocation } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useFormStatus } from "react-dom";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  type: "SMALL" | "BIG";
  id: number;
}

interface DeleteButtonProps {
  type: "SMALL" | "BIG";
}

function DeleteButton({ type }: DeleteButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {type === "BIG" ? (
        <Button
          disabled={pending}
          type="submit"
          className="bg-red-500 uppercase hover:bg-red-600"
        >
          <Trash className="mr-2" />
          {pending ? "Deleting..." : "Delete"}
        </Button>
      ) : (
        <DropdownMenuItem>
          <button disabled={pending} type="submit">
            {pending ? "Deleting..." : "Delete"}
          </button>
        </DropdownMenuItem>
      )}
    </>
  );
}

export default function FormDelete({ type, id }: FormDeleteProps) {
  const deleteLocationById = (_: unknown, formData: FormData) =>
    deleteLocation(_, formData, id);
  const [state, formAction] = useActionState(deleteLocationById, initialState);

  return (
    <form action={formAction}>
      <DeleteButton type={type} />
    </form>
  );
}
