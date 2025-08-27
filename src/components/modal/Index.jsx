import { Button, Modal } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import * as S from "./styles";

export const ModalCadastro = ({ isOpen, title, handleClose, handleSave, children }) => {
    return (
        <Modal
          open={isOpen}
          onClose={handleClose}
        >
          <S.Container>
            <h1>{title}</h1>
            { children }
            <S.Fbar>
              <Button variant="contained" size="medium" startIcon={<ClearIcon />} onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" size="medium" startIcon={<SaveIcon />} color="success" onClick={handleSave}>
                Salvar
              </Button>
            </S.Fbar>
          </S.Container>
        </Modal>
    )
}