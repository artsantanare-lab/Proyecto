"use client";

import type { Guest } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GuestListItem } from "./guest-list-item";

type GuestListProps = {
  guests: Guest[];
  onEditGuest: (guest: Guest) => void;
  onDeleteGuest: (id: string) => void;
};

export function GuestList({
  guests,
  onEditGuest,
  onDeleteGuest,
}: GuestListProps) {
  if (guests.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>No se encontraron invitados.
        </p>
        <p className="text-sm">Intente agregar un nuevo invitado o cambiar su búsqueda.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72">
      <div className="space-y-1 pr-4">
        {guests.map((guest, index) => (
          <div key={guest.id}>
            <GuestListItem
              guest={guest}
              onEdit={() => onEditGuest(guest)}
              onDelete={() => onDeleteGuest(guest.id)}
            />
            {index < guests.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
