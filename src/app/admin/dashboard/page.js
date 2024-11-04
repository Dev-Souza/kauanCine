'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Container } from 'react-bootstrap';
import NavBarLogado from '@/app/components/NavBarLogado';
import NavBarHeader from '@/app/components/NavBarHeader';

// Registra os componentes necessários para o gráfico de barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FilmeMaisVendido = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
        const vendasPorFilme = {};

        pagamentos.forEach((pagamento) => {
            const filmes = JSON.parse(localStorage.getItem('filmes'));
            const filmeBuscado = filmes.find(item => item.id === pagamento.filme);
            if (vendasPorFilme[filmeBuscado.titulo]) {
                vendasPorFilme[filmeBuscado.titulo] += pagamento.poltronas.length;
            } else {
                vendasPorFilme[filmeBuscado.titulo] = pagamento.poltronas.length;
            }
        });

        const labels = Object.keys(vendasPorFilme);
        const data = Object.values(vendasPorFilme);
        const backgroundColors = labels.map((_, index) => `hsl(${(index * 360) / labels.length}, 70%, 50%)`);

        setColors(backgroundColors);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Quantidade de Ingressos Vendidos',
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 1,
                },
            ],
        });
    }, []);

    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));

    useEffect(() => {
        verificarSessao();
    }, []);

    function verificarSessao() {
        if (userLogado) {
            const tempoAtual = new Date().getTime();
            if (tempoAtual > userLogado.expirationTime) {
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
        <div>
            {userLogado != null ? <NavBarLogado /> : <NavBarHeader />}
            <h2 className='text-center mt-4'>Dashboard KauanCine</h2>
            <Container>
                {/* Gráfico - Ingressos Vendidos por Filme */}
                <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Ingressos Vendidos por Filme' },
                    },
                }} />
                <div className="legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {chartData.labels.map((label, index) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: colors[index],
                                marginRight: '5px',
                            }} />
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default FilmeMaisVendido;