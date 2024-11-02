'use client'
import { useEffect } from "react";
import Swal from "sweetalert2";
import CardsFilmes from "./components/CardsFilmes";
import Footer from "./components/Footer";
import NavbarHeader from "./components/NavBarHeader";
import NavBarLogado from "./components/NavBarLogado";
import SwipperCarrossel from "./components/SwipperCarrossel";
import { useRouter } from "next/navigation";

export default function Page() {
  const route = useRouter();
  const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));

  useEffect(() => {
    verificarSessao();
  }, []);

  function verificarSessao() {
    if (userLogado) {
      const tempoAtual = new Date().getTime();
      if (tempoAtual > userLogado.expirationTime) {
        // Expirou a sessão
        localStorage.removeItem('sessaoLogin');
        Swal.fire({
          icon: 'info',
          title: 'Sessão expirada',
          text: 'Por favor, faça login novamente.',
        });
        route.push('/users/login');
      }
    }
  }

  return (
    <>
      {userLogado != null && <NavBarLogado />}
      {userLogado == null && <NavbarHeader titulo="Inicial" />}
      <SwipperCarrossel />
      <CardsFilmes />
      <Footer />
    </>
  );
}
