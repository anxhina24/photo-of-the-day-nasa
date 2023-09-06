import React, {useCallback, useEffect, useState} from 'react';
import PhotoServices from '../services/PhotoService';
import {PhotoDataType} from '../utils/dataTypes';
import PhotoCard from './PhotoCard';
import {Col, Row, Pagination, Button} from 'antd';

const PhotoList: React.FC = () => {
  const itemsPerPage = 5;
  const [photos, setPhotos] = useState<PhotoDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handlePhotosList = useCallback(async () => {
    try {
      const response = await PhotoServices.getAll(currentPage, itemsPerPage);
      setPhotos(response.data.data);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  }, [currentPage, itemsPerPage]);

    const handleDownload = async () => {
        try {
            await PhotoServices.create();
            await handlePhotosList();
        } catch (error) {
            console.log('Error downloading photo:', error);
        }
    };
  useEffect(() => {
      handlePhotosList();
  }, [handlePhotosList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{padding: '16px', border: '1px solid #ccc', marginBottom: '16px'}}>
        <Row gutter={[16, 16]} justify='space-between' align='middle' style={{marginBottom: 20}}>
            <Button
                style={{backgroundColor: '#b0c6b1', color: 'white'}}
                onClick={handleDownload}
            >
                Download Photo of the Day
            </Button>
        </Row>
      <Row gutter={[16, 16]} justify='space-between' align='middle' style={{marginBottom: 20}}>
      </Row>
      <Row gutter={[16, 16]} justify='space-between'>
        {photos.map((photo) => (
          <Col key={photo.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <PhotoCard photo={photo} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalItems}
        pageSize={itemsPerPage}
        showSizeChanger={false}
        style={{textAlign: 'center'}}
      />
    </div>
  );
};

export default PhotoList;
