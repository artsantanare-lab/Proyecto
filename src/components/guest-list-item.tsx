"use client";

import { Pencil, Trash2, User } from "lucide-react";

import type { Guest } from "@/types";
import { Button } from "@/components/ui/button";
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

type GuestListItemProps = {
  guest: Guest;
  onEdit: () => void;
  onDelete: () => void;
};

export function GuestListItem({ guest, onEdit, onDelete }: GuestListItemProps) {
  return (
    <div className="flex items-center p-2 hover:bg-muted/50 rounded-md">
      <div className="flex items-center gap-4 flex-grow">
        <div className="bg-muted p-2 rounded-full">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">{guest.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onEdit} aria-label={`Edit ${guest.name}`}>
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Delete ${guest.name}`}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente.
              {" "}
                <span className="font-semibold">{guest.name}</span> de la lista de invitados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
