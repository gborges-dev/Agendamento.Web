import { useEffect, useState } from "react"
import { Content } from "../../../components/content/Index"
import * as S from "./styles";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { AulasCadastro } from "../cadastro";
import { Button } from "@mui/material";

export const AulasListagem = () => {
    const [storeAulas, setStoreAulas] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const [selectedAula, setSelectedAula] = useState(null);


    const fetchAulas = () => {
        fetch('http://localhost:3003/aulas')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setStoreAulas(data);
          })
          .catch(error => {
            alert(`Erro ao buscar os dados: ${error}`);
          });
    };

    /* const handleEdit = (aula) => {
        setSelectedAula(aula);
        setOpenModal(true);
    }; */
    
    useEffect(() => {
        fetchAulas();
    }, []);

    return (
        <Content>
            <AulasCadastro isOpen={isOpenModal} onClose={handleClose} onRefresh={fetchAulas} aula={selectedAula}/>
            <S.Container>
                <h1>Listagem de aulas</h1>
                <S.ContainerButton>
                    <Button variant="contained" size="medium" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
                        Novo
                    </Button>
                </S.ContainerButton>
            </S.Container>
            <S.Container>
                <S.GridCard>
                    {storeAulas.map((aula) => {
                        return (
                            <S.Card>
                              <S.Row>
                                <S.Label>Horário</S.Label>
                                <S.Horario>{aula.DataHora}</S.Horario>
                              </S.Row>

                              <S.Descricao>{aula.Descricao}</S.Descricao>

                              <S.Row>
                                <S.Label>Capacidade</S.Label>
                                <S.Text>{aula.Capacidade} alunos</S.Text>
                              </S.Row>
                            
                              <S.Row>
                                <div>
                                    <S.Label>Status</S.Label>
                                    <S.Status status={aula.Status}>{aula.Status}</S.Status>
                                </div>
                                <Button variant="contained" size="medium" startIcon={<SearchIcon />} onClick={() => setOpenModal(true)}>
                                    Visualizar
                                </Button>
                              </S.Row>
                              
                            </S.Card>
                        )
                    })}
                </S.GridCard>
            </S.Container>
        </Content>
    )
}