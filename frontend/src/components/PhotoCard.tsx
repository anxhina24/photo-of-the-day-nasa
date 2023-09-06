import React from 'react';
import {Card, Typography, Button, Tooltip} from 'antd';
import { PhotoDataType} from '../utils/dataTypes';
import {Link} from "react-router-dom";
const {Title, Text} = Typography;
//Props interface for PhotoCard component
interface PhotoCardProps {
  /**
   * photo component contains photo details
   */
  photo: PhotoDataType;
}
const PhotoCard: React.FC<PhotoCardProps> = ({photo}) => {
  //Return JSX for PhotoCard component
  return (
      <Card
          key={photo.id}
          hoverable
          style={{ maxWidth: 300, marginBottom: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          className="photo-card"
      >
        <div style={{ height: 100 }}>
          <Title level={5} style={{ marginBottom: 0, lineHeight: 1.2 }}>
            {photo.title}
          </Title>
        </div>
        <Link to={`/photo/${photo.id}`} state={photo} style={{ textDecoration: 'none' }} >
          <Tooltip title={photo.description} placement="right">
            {photo.path.includes('youtube') ? (
                <iframe
                    width="100%"
                    height="315"
                    src={photo.path}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            ) : (
                <img
                    height={300}
                    width={200}
                    alt={photo.title}
                    src={photo.path}
                />
            )}
          </Tooltip>
        </Link>
        <div style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Date</Text>
          <Text style={{ marginLeft: 8 }}>{photo.date}</Text>
        </div>
      </Card>
  );
};

export default PhotoCard;
