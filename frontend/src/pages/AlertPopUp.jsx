import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal} from 'react-bootstrap';


function AlertPopUp({showAlert,errorTitle, errorBody}){
  const handleClose = () => {showAlert(false);}
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{errorTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlertPopUp