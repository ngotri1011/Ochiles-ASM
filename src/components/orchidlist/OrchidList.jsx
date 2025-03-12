import React from "react";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Pagination, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { dataOrchid } from "../../Share/ListOfOrchids";

export default function OrchidList() {
  const [API, setAPI] = useState([]);

  useEffect(() => {
    const remappedData = dataOrchid.map((orchid, index) => ({
      id: index + 1,
      name: orchid.name || "Unknown",
      rating: orchid.rating || 0,
      isSpecial: orchid.isSpecial || false,
      image: orchid.image || "https://via.placeholder.com/100",
      color: orchid.color || "Unknown",
      origin: orchid.origin || "Unknown",
      category: orchid.category || "General",
      info: orchid.info || "No information available",
      cost: orchid.cost || "N/A",
    }));
    setAPI(remappedData);
  }, []);

  const numRowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const sortedApi = [...API].sort((a, b) => a.id - b.id);
    const start = (currentPage - 1) * numRowsPerPage;
    const end = start + numRowsPerPage;
    setPaginatedData(sortedApi.slice(start, end));
  }, [API, currentPage]);

  const numPages = Math.ceil(API.length / numRowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item ?");
    if (confirmed) {
      setAPI(API.filter((item) => item.id !== id));
      toast.success("Deleted successfully!!", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div className="orchid-list">
      <Container fluid="lg">
        <Row className="justify-content-md-end">
          <Col md={12}>
            <Link to={"/add"}>
              <Button variant="primary" className="btn-main-style" style={{ width: "initial" }}>
                Add new Orchid
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "20px" }}>
          <Col md={12}>
            <Table striped bordered hover className="dashboard__table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Special</th>
                  <th>Color</th>
                  <th>Origin</th>
                  <th>Category</th>
                  <th>Info</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((orchid) => (
                  <tr key={orchid.id}>
                    <td>{orchid.id}</td>
                    <td className="image">
                      <Image src={orchid.image} rounded width={100} />
                    </td>
                    <td>{orchid.name}</td>
                    <td>{orchid.rating}</td>
                    <td>{orchid.isSpecial ? "Yes" : "No"}</td>
                    <td>{orchid.color}</td>
                    <td>{orchid.origin}</td>
                    <td>{orchid.category}</td>
                    <td>{orchid.info}</td>
                    <td>{orchid.cost}</td>
                    <td>
                      <div className="btn-wrapper">
                        <Link to={`/edit/${orchid.id}`}>
                          <Button>
                            <MdModeEdit />
                          </Button>
                        </Link>
                        <Button variant="danger" onClick={() => handleDelete(orchid.id)}>
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination className="justify-content-center mt-3">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

              {[...Array(numPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === numPages} />
              <Pagination.Last onClick={() => handlePageChange(numPages)} disabled={currentPage === numPages} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
