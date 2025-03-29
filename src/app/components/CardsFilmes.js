import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';

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
                <h1 className='text-center mb-4'>Filmes disponíveis</h1>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Carregando filmes...</p>
                    </div>
                ) : (
                    <Row>
                        <div className="d-flex flex-wrap">
                            {filmes.length === 0 ? (
                                <p className="text-center">Nenhum filme disponível.</p>
                            ) : (

                                filmes.map(item => (
                                    <Col key={item.id} md={4} className='mt-2 p-1'>
                                        <Link href={`/sessoes/${item.id}`} passHref>
                                            <Card style={{height: '100%' }}>
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
                                    </Col>
                                ))

                            )}
                        </div>
                    </Row>)}
            </div>
        </Container>
    );
}