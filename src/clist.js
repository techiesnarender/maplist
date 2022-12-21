import { useEffect, useState} from "react";
import { Container, Row, Col, Button } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Updateform from "./updateform";

function CompanyList() {
  const [data, setdata] = useState([]);
  const [load, setLoad] = useState(false)
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const handlesClose = () => setShow(false);
  const handlesShow = () => setShow(true);
  /*---------------------props------------------------*/
  const [contactname, setContactname] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword,setUpdatePassword] = useState("");
  const [updatCompany,setUpdatCompany] = useState("");
  const [updateOpen,setUpdateOpen] = useState("");
  const [updateClose,setUpdateClose] = useState("")
  const [updateAddress,setUpdateAddress] = useState("")
  const [updateLatitude,setUpdateLatitude] = useState();
  const [updateLongitude,setUpdateLongitude] = useState("")
  const [id,setId] = useState()
  /*---------------------props------------------------*/

  function handleShow(breakpoint, item) {
    setFullscreen(breakpoint);
    setShow(true);
    setContactname(item.contactname)
    setUpdateEmail(item.email)
    setUpdatePassword(item.password)
    setUpdatCompany(item.company)
    setUpdateOpen(item.open)
    setUpdateClose(item.close)
    setUpdateAddress(item.address)
    setUpdateLatitude(item.latitude)
    setUpdateLongitude(item.longitude)
    setId(item.id)
  }

  function getList() {
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

  function deleteUser(id) {
    getList()
    fetch(`https://tomcat1.shiftescape.com/api/users/delete/${id}`, {
      method: "POST"
    }).then((response) => {
      console.log(response)
    })

  }

  useEffect(() => {
    setLoad(true);
    getList();
    deleteUser();
  }, [id])

  
  return (<>
    <Container fluid>
      <Row>
        <Col>
       {/* <input type="text" value={data[0].contactname} onChange={(e)=> e.target.value}/> */}

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
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.contactname}</td>
                    <td>{item.email}</td>
                    <td>{item.company}</td>
                    <td width="30%">{item.address}</td>
                    <td>{item.open} - {item.close}</td>
                    <td><Button onClick={() => deleteUser(item.id)}>Delete</Button> <span>&nbsp;</span>
                      {values.map((v, idx) => (
                        <Button key={index} className="me-2" onClick={() => handleShow(v, item)}>
                          Update
                          {typeof v === 'string' && `below ${v.split('-')[0]}`}
                        </Button>
                      ))}

                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Col>

      </Row>

    </Container>
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Updateform
        id={id}
        name={contactname}
        password={updatePassword}
        email={updateEmail}
        address={updateAddress}
        open={updateOpen}
        close={updateClose}
        company={updatCompany}
        latitude={updateLatitude}
        longitude={updateLongitude}
        />

      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handlesClose}>
            Close
          </Button>
        
        </Modal.Footer>
    </Modal>
  </>)
}

export default CompanyList