import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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

export default function Orchid({ orchids }) {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="container" style={{backgroundColor:"#EBE8DB"}}>
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
                
                <CardBody>
                  <h5>{item.name}</h5>
                  <p>{item.category}</p>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setSelectedItem(item)}
                    style={{backgroundColor:"#B03052", borderColor:"black"}}
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

      {/* Bootstrap Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content" style={{ backgroundColor: "white", color: "black" }}>
            <div className="modal-header">
              <h5 className="modal-title">{selectedItem?.name || "Orchid Details"}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedItem && (
                <>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="img-fluid rounded mx-auto d-block"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                  <h6 className="mt-3">{selectedItem.name}</h6>
                  <p>{selectedItem.info}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}