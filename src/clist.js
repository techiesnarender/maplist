import { useEffect, useState,useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Updateform from "./updateform";

function CompanyList() {
  const [data, setdata] = useState([]);
  const [load,setLoad] = useState(false)
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true); 
  }

  function getList(){
    fetch("https://tomcat1.shiftescape.com/api/users").then((response) => {
      setLoad(false);
      response.json().then(((result) => {
        //console.log(result)
        setdata(result);
        
      }))
    }).catch(e => {
     // console.log(e);
      setLoad(false);
    });
  }

  function deleteUser(id){
    fetch(`https://tomcat1.shiftescape.com/api/users/delete/${id}`,{
      method:"POST"
    }).then((response)=>{
      console.log(response)
    })

  }

  useEffect(() => {
    setLoad(true);
    getList();
    deleteUser();
  }, [])

  return (<>
    <Container fluid>
      <Row>
        <Col>
          <h1 className="text-center mt-4">Company List</h1>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
              <th>ID</th>
              <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company  Name</th>
                <th>Address</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            {load && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            <tbody>
              {
                data.map((item, index) =>

                  <tr key={index}>
                     <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.contactname}</td>
                    <td>{item.email}</td>
                    <td>{item.company}</td>
                    <td>{item.address}</td>
                    <td>{item.open} - {item.close}</td>
                    <td><Button onClick={()=>deleteUser(item.id)}>Delete</Button> <span>&nbsp;</span>
                    {values.map((v, idx) => (
        <Button key={idx} className="me-2" onClick={() => handleShow(v)}>
          Update
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Updateform/>
        </Modal.Body>
      </Modal>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Col>

      </Row>
    
    </Container>
  </>)
}

export default CompanyList