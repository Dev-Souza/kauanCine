import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';

export default function CardsFilmes() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedFilmes = JSON.parse(localStorage.getItem('filmes')) || [];
        setFilmes(storedFilmes);
        setLoading(false);
    }, []);

    return (
        <Container style={{ maxWidth: 1100 }} className='bg-white'>
            <div className='p-4'>
                <h1>Filmes disponíveis</h1>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Carregando filmes...</p>
                    </div>
                ) : (
                    <div className="d-flex flex-wrap gap-2">
                        {filmes.length === 0 ? (
                            <p className="text-center">Nenhum filme disponível.</p>
                        ) : (
                            filmes.map(item => (
                                <Link href={`/sessoes/${item.id}`} key={item.id} passHref>
                                    <Card style={{ width: '20rem', height: '100%' }} className='mb-4'>
                                        <Card.Img
                                            variant="top"
                                            src={item.imagem_filme}
                                            alt={`Imagem do filme ${item.titulo}`}
                                            style={{ height: 400, objectFit: 'cover' }}
                                        />
                                        <Card.Body className='text-center'>
                                            <Card.Title className='text-black' style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                                                {item.titulo}
                                            </Card.Title>
                                            <Card.Text>
                                                {item.genero}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
}