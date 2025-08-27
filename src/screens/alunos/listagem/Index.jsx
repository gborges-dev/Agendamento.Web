import { useEffect, useState } from "react"
import { Content } from "../../../components/content/Index"
import BasicCard from "../../../components/card";
import * as S from "./styles";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AlunoCadastro } from "../cadastro";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const AlunoListagem = () => {
    const [storeAlunos, setStoreAlunos] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const [selectedAluno, setSelectedAluno] = useState(null);


    const fetchAlunos = () => {
        fetch('http://localhost:3003/alunos')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setStoreAlunos(data);
          })
          .catch(error => {
            alert(`Erro ao buscar os dados: ${error}`);
          });
    };

    const handleEdit = (aluno) => {
        setSelectedAluno(aluno);
        setOpenModal(true);
    };
    
    useEffect(() => {
        fetchAlunos();
    }, []);

    return (
        <Content>
            <AlunoCadastro isOpen={isOpenModal} onClose={handleClose} onRefresh={fetchAlunos} aluno={selectedAluno}/>
            <S.Container>
                <h1>Listagem de alunos</h1>
                <S.ContainerButton>
                    <Button variant="contained" size="medium" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
                        Novo
                    </Button>
                </S.ContainerButton>
            </S.Container>
            <S.Container>
                <S.GridCard>
                    {storeAlunos.map((aluno, index) => {
                        return (
                            <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, minWidth: 250 }}>
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  {aluno.Nome}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                  Data de Nascimento:{" "}
                                  {aluno.DataNascimento
                                    ? format(new Date(aluno.DataNascimento), "dd/MM/yyyy", { locale: ptBR })
                                    : "-"}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                  Plano: {aluno.TipoPlano.label}
                                </Typography>

                                <S.ContainerButtonEditar>
                                    <Button variant="contained" size="medium" startIcon={<EditIcon />} onClick={() => handleEdit(aluno)}>
                                        Editar
                                    </Button>
                                </S.ContainerButtonEditar>

                              </CardContent>
                            </Card>
                        )
                    })}
                </S.GridCard>
            </S.Container>
        </Content>
    )
}