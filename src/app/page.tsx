import { GuestManagement } from "@/components/guest-management";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background p-4 py-8 md:p-8">
      <GuestManagement />
    </main>
  );
}
