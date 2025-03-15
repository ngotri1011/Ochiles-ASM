import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaVideo } from "react-icons/fa";
import { OrchidAPI } from "../../api/OrchidAPI";

// Styled Components
const OrchidCard = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  overflow: visible;
  &:hover {
    transform: scale(1.05);
  }
`;

const IconContainer = styled("div")`
  position: absolute;
  bottom: 150px;
  right: 10px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const OrchidImageContainer = styled("div")`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  &:hover ${IconContainer} {
    opacity: 1;
  }
`;

const OrchidImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardBody = styled("div")`
  background-color: white;
  color: black;
  padding: 15px;
  text-align: center;
  border-radius: 0 0 8px 8px;
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
  width: 130px;
  top: 11px;
  left: -37px;
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
  clip-path: polygon(27% 0%, 73% 0%, 100% 100%, 0% 100%);
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
const VideoIcon = styled(FaVideo)`
  border-radius: 50%;
  background-color: orange;
  padding: 8px;
  color: white; 
  width: 40px;
  height: 40px;
`;

export default function Orchid() {
  const [orchids, setOrchids] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await fetch(OrchidAPI);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await response.text();
          throw new Error(`Invalid JSON response: ${errorText.substring(0, 100)}`);
        }
        const data = await response.json();
        setOrchids(data);
      } catch (error) {
        console.error("Failed to fetch orchids:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrchids();
  }, []);

  if (loading) return <p>Loading orchids...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="row" style={{ margin: "20px" }}>
        {orchids && orchids.length > 0 ? (
          orchids.map((item) => (
            <div className="col-md-4 d-flex align-items-stretch" key={item.id}>
              <OrchidCard className="card text-center">
                {item.isSpecial && (
                  <RibbonContainer>
                    <Ribbon>Special</Ribbon>
                  </RibbonContainer>
                )}
                <Link to={`/detail/${item.id}`} style={{ display: "block" }}>
                  <OrchidImageContainer>
                    <OrchidImage src={item.image} alt={item.name} />
                  </OrchidImageContainer>
                </Link>
                <VideoIcon style={{position:"absolute", right:"5",top: "50%",transform: "translateY(-50%)",}}/>
                <CardBody>
                  <h5>{item.name}</h5>
                  <p>{item.category}</p>
                  <p>Price: {item.cost} $</p>
                  <p><Rating name="half-rating-read" defaultValue={2.5} precision={0.5} value={item.rating} readOnly /></p>
                  <button
                    className="btn btn-primary btn-main-style"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setSelectedItem(item)}
                  >
                    View Details
                  </button>
                </CardBody>
              </OrchidCard>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
