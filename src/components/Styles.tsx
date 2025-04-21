import React from "react";
import { Row, Col } from "antd";
import { styles } from "../constants";
import { useMapStyle } from "../context/MapStyleContext";

export const Styles = () => {
  const { setStyle } = useMapStyle();
  return (
    <div className="style">
      <Row gutter={[5, 5]} justify="center">
        {styles.map((style) => (
          <Col key={style.id}>
                <img 
                  alt={style.name} 
                  src={style.src} 
                  className="style-image" 
                  onClick={() => setStyle(style.name)}
                />
              
          </Col>
        ))}
      </Row>
    </div>
  );
};
