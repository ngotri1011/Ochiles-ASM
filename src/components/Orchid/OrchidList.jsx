import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Pagination, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Orchid_URL } from "../../api/OrchidAPI";

export default function OrchidList() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numRowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await fetch(Orchid_URL);
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

  // Pagination logic
  useEffect(() => {
    const sortedOrchids = [...orchids].sort((a, b) => a.id - b.id);
    const start = (currentPage - 1) * numRowsPerPage;
    const end = start + numRowsPerPage;
    setPaginatedData(sortedOrchids.slice(start, end));
  }, [orchids, currentPage]);

  const numPages = Math.ceil(orchids.length / numRowsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this orchid?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${Orchid_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete orchid');
        }

        setOrchids((prevOrchids) => prevOrchids.filter((orchid) => orchid.id !== id));
        toast.success("Orchid deleted successfully!", { position: "top-right", autoClose: 2000 });
      } catch (error) {
        console.error("Error deleting orchid:", error);
        toast.error("Failed to delete orchid. Please try again.", { position: "top-right", autoClose: 2000 });
      }
    }
  };

  if (loading) return <p>Loading orchids...</p>;
  if (error) return <p>Error: {error}</p>;

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
                      <Image src={orchid.image || "https://via.placeholder.com/100"} rounded width={100} />
                    </td>
                    <td>{orchid.name}</td>
                    <td>{orchid.rating}</td>
                    <td>{orchid.isSpecial ? "Yes" : "No"}</td>
                    <td>{orchid.color}</td>
                    <td>{orchid.origin}</td>
                    <td>{orchid.category}</td>
                    <td>{orchid.info}</td>
                    <td>{orchid.cost}$</td>
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
