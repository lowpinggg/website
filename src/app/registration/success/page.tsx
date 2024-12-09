// app/registration/success/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container py-10 h-screen mx-auto flex justify-center flex-col items-center">
      <h1>Paiement réussi !</h1>
      <p>
        Merci pour votre inscription. Vous recevrez un email de confirmation
        sous peu.
      </p>
      <Link href={"/"}>
        <Button className="mt-8">Retour</Button>
      </Link>
    </div>
  );
}
