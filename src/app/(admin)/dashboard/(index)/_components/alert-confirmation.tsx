import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertConfirmationProps {
  alertTitle: string;
  alertDescription: string;
  buttonShowDialogTitle?: string;
  buttonShowDialogClassName?: string;
  children?: React.ReactNode;
}

export default function AlertConfirmation({
  alertTitle,
  alertDescription,
  children,
  buttonShowDialogTitle,
  buttonShowDialogClassName,
}: AlertConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={buttonShowDialogClassName}>
          {buttonShowDialogTitle ?? "buttonShowDialogTitle"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild={children ? true : false}>
            {children ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
