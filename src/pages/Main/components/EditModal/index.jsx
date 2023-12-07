import PropTypes from 'prop-types';
import  { useState } from 'react';
import './styles.scss';


const EditModal = ({ isOpen, onClose, handleSaveEdit, selectedTrackingCode }) => {
  const [editedValue, setEditedValue] = useState(selectedTrackingCode);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    console.log(editedValue);
    handleSaveEdit(editedValue);
    onClose();
  };

  return (
    <div className={`edit-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content flex-center-column">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Nome do Código</h2>
        <h4>Atual: {selectedTrackingCode}</h4>
        <input 
        type="text"
         onChange={handleInputChange} 
         />
        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  selectedTrackingCode: PropTypes.string.isRequired,
};

export default EditModal;
