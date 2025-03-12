import React from "react";
import { useParams, Link } from "react-router-dom";
import { dataOrchid } from "../../../Share/ListOfOrchids";
import { styled } from "@mui/material/styles";
import { Button } from "react-bootstrap";
import { Rating } from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
// Styled Components
const PageContainer = styled("div")`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const DetailCard = styled("div")`
  position: relative;
  display: flex;
  width: 70%;
  max-width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: visible;
  flex-direction: row;
`;

const RibbonContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  width: 120px;
  height: 120px;
  z-index: 1;
`;

const Ribbon = styled("div")`
  position: absolute;
  width: 170px;
  top: 25px;
  left: -45px;
  background: linear-gradient(#ff0000, #cc0000);
  color: white;
  padding: 8px 0;
  transform: rotate(-45deg);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23);
  clip-path: polygon(21% 0%, 80% 0%, 100% 100%, 0% 100%);
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    border-style: solid;
    border-width: 0;
  }
  
  &::before {
    left: 0;
    border-width: 0 5px 5px 0;
    border-color: transparent #990000 transparent transparent;
  }
  
  &::after {
    right: 0;
    border-width: 5px 5px 0 0;
    border-color: #990000 transparent transparent transparent;
  }
`;

const ImageContainer = styled("div")`
  flex: 1;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const OrchidImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailsContainer = styled("div")`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SpecialText = styled("span")`
  color: ${(props) => (props.isSpecial ? "green" : "red")};
  font-weight: bold;
  margin-left: 5px;
`;

const BackButtonContainer = styled("div")`
  position: absolute;
  top: -50px;
  left: 0;
`;

export default function Detail() {
  const { id } = useParams();
  const orchid = dataOrchid.find((obj) => obj.id == id);
  let cost = orchid.cost.toLocaleString();

  return (
    <PageContainer>
      <DetailCard>
        <BackButtonContainer>
          <Link to={"/"} style={{ textDecoration: "none" }}>
          
            <Button variant="primary" className="btn-main-style">
            <IoArrowBackSharp/>
              Back to Home page
            </Button>
          </Link>
        </BackButtonContainer>
        {orchid.isSpecial && (
          <RibbonContainer>
            <Ribbon>Special</Ribbon>
          </RibbonContainer>
        )}
        <ImageContainer>
          <OrchidImage src={orchid.image} alt={orchid.name} />
        </ImageContainer>
        <DetailsContainer>
          <h3 style={{fontWeight:'bold'}}>{orchid.name}</h3>
          <p style={{fontWeight:'lighter'}}>{orchid.info}</p>
          <div>Origin: {orchid.origin}</div>
          <div>Market value: € {cost}</div>
          <div>
            Orchid's Special:
            <SpecialText isSpecial={orchid.isSpecial}>
              {orchid.isSpecial ? "Yes" : "No"}
            </SpecialText>
          </div>
          <div>Category: {orchid.category}</div>
          <div>
            Color: <span style={{ color: orchid.color }}>{orchid.color}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>Rating:</span>
            <Rating name="read-only" value={orchid.rating} readOnly />
          </div>
        </DetailsContainer>
      </DetailCard>
    </PageContainer>
  );
}
