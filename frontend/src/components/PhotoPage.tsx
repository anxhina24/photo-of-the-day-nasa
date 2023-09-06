import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Button, Card, Row, Typography} from "antd";
const {Title, Text} = Typography;

const PhotoPage: React.FC = () => {
    const location = useLocation();
    return (
        <div style={{padding: '16px', border: '1px solid #ccc', marginBottom: '16px'}}>
            <Row gutter={[16, 16]} justify='space-between' align='middle' style={{marginBottom: 20}}>
                <Link to={'/'}>
                    <Button
                        style={{backgroundColor: '#b0c6b1', color: 'white'}}
                    >
                        Go Back
                    </Button>
                </Link>
            </Row>
            <Row gutter={[16, 16]} justify='space-between' align='middle' style={{marginBottom: 20}}>
            </Row>
            <Row gutter={[16, 16]} justify='center'>
                <Card
                    key={location.state.id}
                    hoverable
                    style={{ maxWidth: 800}}
                    className="photo-card"
                >
                    <div style={{ height: 100 }}>
                        <Title level={5} style={{ marginBottom: 0, lineHeight: 1.2 }}>
                            {location.state.title}
                        </Title>
                    </div>
                    <img height={400} width={500} alt={location.state.title} src={`/${location.state.path}`} />
                    <div style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Description</Text>
                        <Text style={{ marginLeft: 8 }}>{location.state.description}</Text>
                    </div>
                </Card>

            </Row>
        </div>

    );
};

export default PhotoPage;
