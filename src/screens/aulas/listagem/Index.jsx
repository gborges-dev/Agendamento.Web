import { useEffect, useState } from "react"
import { Content } from "../../../components/content/Index"
import * as S from "./styles";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from "@mui/icons-material/Lock";
import { AulasCadastro } from "../cadastro";
import { Button, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns"; // Importa a função format
import { ptBR } from "date-fns/locale";
import {AgendarAula} from "../detalhes";

export const AulasListagem = () => {
    const [storeAulas, setStoreAulas] = useState([]);
    const [isOpenModalCadastro, setOpenModalCadastro] = useState(false);
    const [isOpenModalDetalhes, setOpenModalDetalhes] = useState(false);
    const handleCloseCadastro = () => setOpenModalCadastro(false);
    const handleCloseDetalhes = () => setOpenModalDetalhes(false);
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

    const formatarHora = (dataHora) => {
        if (!dataHora) return "";
        const date = new Date(dataHora);
        return format(date, "HH:mm", { locale: ptBR });
    };

    const onVisualizar = (aula) => {
      setSelectedAula(aula);
      setOpenModalDetalhes(true);
    }

    useEffect(() => {
        fetchAulas();
    }, []);

    return (
        <Content>
            <AulasCadastro isOpen={isOpenModalCadastro} onClose={handleCloseCadastro} onRefresh={fetchAulas}/>
            <AgendarAula isOpen={isOpenModalDetalhes} onClose={handleCloseDetalhes} onRefresh={fetchAulas} aula={selectedAula}/>
            <S.Container>
                <h1>Listagem de aulas</h1>
                <S.ContainerButton>
                    <Button variant="contained" size="medium" startIcon={<AddIcon />} onClick={() => setOpenModalCadastro(true)}>
                        Novo
                    </Button>
                </S.ContainerButton>
            </S.Container>
            <S.Container>
                <S.GridCard>
                    {storeAulas.map((aula) => {
                        const quantidadeParticipantes = aula.Participantes ? aula.Participantes.length : 0;

                        return (
                            <S.Card key={aula.id}>
                              <S.Row>
                                <S.Label>Horário</S.Label>
                                <Typography variant="body2" color="text.secondary">
                                  {formatarHora(aula.DataHora)} {/* Formata a hora */}
                                </Typography>
                              </S.Row>

                              <S.Descricao>{aula.Descricao}</S.Descricao>

                              <S.Row>
                                <S.Label>Capacidade</S.Label>
                                <S.Text>{aula.Capacidade} alunos</S.Text>
                              </S.Row>
                              
                              <S.Row>
                                <S.Label>Alunos agendados</S.Label>
                                <S.Text>{quantidadeParticipantes} aluno(as)</S.Text>
                              </S.Row>
                            
                              <S.Row>
                                <S.Status status={aula.Status.label}>{aula.Status.label}</S.Status>
                                {aula.Participantes ? 
                                  aula.Participantes.length == aula.Capacidade ? 
                                    <Tooltip title="Aula bloqueada (capacidade atingida)">
                                      <LockIcon color="warning" fontSize="small" />
                                    </Tooltip> : <></> : <></>}
                                <Button variant="contained" size="medium" startIcon={<SearchIcon />} onClick={() => onVisualizar(aula)}>
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