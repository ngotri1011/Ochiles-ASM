import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "@mui/icons-material"; // Import icons
import ribbonImg from "../../../assets/images/ribbon-red.png";
import bgImg from "../../../assets/images/orchid-bg.jpg";

// Styled Components
const PageContainer = styled("div")`
  position: relative;
  min-height: 100vh;
`;

const OrchidCard = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const OrchidImageContainer = styled("div")`
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

const OrchidImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Ribbon = styled("img")`
  position: absolute;
  top: 10px;
  right: -15px;
  width: 80px;
  transform: rotate(45deg);
`;

const CardBody = styled("div")`
  background-color: white;
  color: black;
  padding: 15px;
  text-align: center;
`;

// New: Icon Container
const IconContainer = styled("div")`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const IconButton = styled("div")`
  background-color: pink;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background-color: #ff6699;
  }
`;

export default function Orchid({ orchids }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <PageContainer>
      <div className="container">
        <div className="row">
          {orchids && orchids.length > 0 ? (
            orchids.map((item) => (
              <div className="col-md-4 d-flex align-items-stretch" key={item.id}>
                <OrchidCard className="card text-center">
                  {item.isSpecial && <Ribbon src={ribbonImg} alt="Special" />}

                  {/* Bọc hình ảnh trong <Link> */}
                  <Link to={`/detail/${item.id}`} style={{ display: "block" }}>
                    <OrchidImageContainer>
                      <OrchidImage src={item.image} alt={item.name} />
                      {/* Icon Container */}
                      <IconContainer>
                        <IconButton>
                          <ShoppingCart />
                        </IconButton>
                        <IconButton>
                          <Search />
                        </IconButton>
                      </IconContainer>
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
    </PageContainer>
  );
}
