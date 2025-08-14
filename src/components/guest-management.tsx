"use client";

import { useState, useEffect, useMemo } from "react";
import { ClipboardList, Search } from "lucide-react";

import type { Guest } from "@/types";
import { AddGuestForm } from "./add-guest-form";
import { GuestList } from "./guest-list";
import { EditGuestDialog } from "./edit-guest-dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";

export function GuestManagement() {
  const [isMounted, setIsMounted] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  useEffect(() => {
    // Initial guests are set on the client to use crypto.randomUUID
    setGuests([
      { id: crypto.randomUUID(), name: "Eliminar o editar" },
      { id: crypto.randomUUID(), name: "Eliminar o editar" },
      { id: crypto.randomUUID(), name: "Eliminar o editar" },
      { id: crypto.randomUUID(), name: "Eliminar o editar" },
      { id: crypto.randomUUID(), name: "Eliminar o editar" },
    ]);
    setIsMounted(true);
  }, []);

  const handleAddGuest = (name: string) => {
    const newGuest = { id: crypto.randomUUID(), name };
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleUpdateGuest = (id: string, name: string) => {
    setGuests((prev) =>
      prev.map((guest) => (guest.id === id ? { ...guest, name } : guest))
    );
    setEditingGuest(null);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [guests, searchTerm]);

  if (!isMounted) {
    return (
       <Card className="w-full max-w-2xl">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
          </div>
          <Separator />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10">
        <CardHeader>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-primary/10 rounded-lg">
                <ClipboardList className="h-6 w-6 text-primary" />
             </div>
             <div>
                <CardTitle className="font-headline text-2xl">Lista de invitados</CardTitle>
                <CardDescription>Recepción</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <AddGuestForm onAddGuest={handleAddGuest} />
            <div className="flex gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar invitado"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
          </div>
          <Separator />
          <GuestList
            guests={filteredGuests}
            onEditGuest={(guest) => setEditingGuest(guest)}
            onDeleteGuest={handleDeleteGuest}
          />
        </CardContent>
      </Card>

      <EditGuestDialog
        guest={editingGuest}
        isOpen={!!editingGuest}
        onOpenChange={(open) => !open && setEditingGuest(null)}
        onUpdateGuest={handleUpdateGuest}
      />
    </>
  );
}
