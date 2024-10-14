import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default () => {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        setFilmes(JSON.parse(localStorage.getItem('filmes')) || []);
    }, []);

    return (
        <Container>
            <div className="d-flex flex-wrap gap-2">

                {filmes.map(item => (
                    <Link href={`/sessoes/${item.id}`} key={item.id}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={item.imagem_filme} style={{ height: 450 }} />
                        </Card>
                    </Link>
                ))}

            </div>
        </Container>
    );
};