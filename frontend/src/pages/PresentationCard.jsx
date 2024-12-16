import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PresentationCard = ({ id, name, thumbnail ,description, slideCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    let pg=1
    navigate(`/slides/${id}/${pg}`)
  };

  return (
    <Card onClick={handleClick}>
      <Thumbnail src={thumbnail || "https://via.placeholder.com/150"} alt={`${name} thumbnail`} />
      <Info>
        <Title>{name}</Title>
        <Description>{description || ""}</Description>
        <SlideCount>{slideCount} {slideCount === 1 ? "Slide" : "Slides"}</SlideCount>
      </Info>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom:40px;
  width:400px;
  height:200px;
  min-width: 100px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  /* Responsive adjustments for larger screens */
  @media (min-width: 600px) {
    width: 240px;
    height: 120px;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  background-color: #e0e0e0; /* Grey square if no thumbnail */
`;

const Info = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 0.8em;
  margin: 0;
  padding-bottom:3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Description = styled.p`
  font-size: 0.7em;
  color: #666;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const SlideCount = styled.span`
  font-size: 0.6em;
  color: #888;
`;

export default PresentationCard;
