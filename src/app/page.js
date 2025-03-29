'use client'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CardsFilmes from "./components/CardsFilmes";
import Footer from "./components/Footer";
import NavbarHeader from "./components/NavBarHeader";
import NavBarLogado from "./components/NavBarLogado";
import SwipperCarrossel from "./components/SwipperCarrossel";
import { useRouter } from "next/navigation";

export default function Page() {
  const route = useRouter();
  const [userLogado, setUserLogado] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("sessaoLogin"));
      setUserLogado(user);
      verificarSessao(user);
    }
  }, []);

  function verificarSessao(user) {
    if (user) {
      const tempoAtual = new Date().getTime();
      if (tempoAtual > user.expirationTime) {
        // Expirou a sessão
        localStorage.removeItem("sessaoLogin");
        setUserLogado(null);
        Swal.fire({
          icon: "info",
          title: "Sessão expirada",
          text: "Por favor, faça login novamente.",
        });
        route.push("/users/login");
      }
    }
  }

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #f0f0f0;
        }
        a {
          text-decoration: none;
        }
      `}</style>

      {userLogado ? <NavBarLogado /> : <NavbarHeader />}
      <SwipperCarrossel />
      <CardsFilmes />
      <Footer />
    </>
  );
}