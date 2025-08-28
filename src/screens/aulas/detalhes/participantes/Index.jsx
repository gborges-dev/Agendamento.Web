import { useEffect, useState } from "react";
import * as S from "./styles";
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ParticipantesDaAula = ({ participantes, onAdicionar, onRemover, Capacidade, onDisabled, aula }) => {
    const [novoParticipante, setNovoParticipante] = useState(null);
    const [alunosCadastrados, setAlunosCadastrados] = useState(null);
    const [participantesState, setParticipantesState] = useState([]);
    const [errors, setErrors] = useState({
        Participante: false
    });

    useEffect(() => {
        fetchAlunos();

        if (participantes) {
            setParticipantesState(participantes);
        }
    }, []);

    const fetchAlunos = () => {
        fetch('http://localhost:3003/alunos')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setAlunosCadastrados(data);
          })
          .catch(error => {
            alert(`Erro ao buscar os dados: ${error}`);
          });
    };

    const handleAddParticipante = (participante) => {
        if (!participante) {
            setErrors({ Participante: true });
            return;
        }

        if((participantesState.length + 1) > Capacidade) {
            alert('Atenção: Capacidade máxima atingida.');
            return;
        };

        if (participantesState.some((p) => p.id === participante.id)) {
            alert("Participante já adicionado.");
            return;
        }
        const dataHoraAulaFormatada = format(aula.DataHora, "dd/MM/yyyy HH:mm", { locale: ptBR });
        const dataAtualFormatada = format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
    
        if (dataHoraAulaFormatada < dataAtualFormatada && !aula.PermiteAgendamentoPosInicio) {
            alert("Não é possível adicionar participantes após o início da aula.");
            return;
        };

        const updatedParticipantes = [...participantesState, participante];
        setParticipantesState(updatedParticipantes);
        setNovoParticipante(null);
        setErrors({ Participante: false });

        if (onAdicionar) {
            onAdicionar(participante);
        }
    };

    const handleRemoverParticipante = (participante) => {
        const updatedParticipantes = participantesState.filter((p) => p.id !== participante.id);

        setParticipantesState(updatedParticipantes);

        if (onRemover) {
            onRemover(participante.id);
        };
    };

    return (
        <S.ContainerPai>
            <h3>Participantes</h3>
            <S.Row>
                <Autocomplete
                    disablePortal
                    options={alunosCadastrados}
                    value={novoParticipante}
                    onChange={(event, newValue) => setNovoParticipante(newValue ? newValue : null)}
                    getOptionLabel={(option) => option.Nome || ""}
                    sx={{ width: '200px' }}
                    disabled={onDisabled}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Novo participante"
                            error={errors.Participante}
                            helperText={errors.Participante ? "Participante é obrigatório" : ""}
                        />
                    )}
                />
                <Button variant="contained" size="medium" disabled={onDisabled} startIcon={<AddIcon />} onClick={() => handleAddParticipante(novoParticipante)}>
                    Adicionar
                </Button>
            </S.Row>
            <S.Container>
                <S.GridCard>
                    {participantesState && participantesState.map((participante) => {
                        return (
                            <S.Card key={participante.id}>
                                <S.Row>
                                    <S.Text>{participante.Nome}</S.Text>
                                    <DeleteIcon color="primary" fontSize="small" onClick={() => handleRemoverParticipante(participante)}/>
                                </S.Row>
                            </S.Card>
                        )
                    })}
                </S.GridCard>
            </S.Container>        
        </S.ContainerPai>
    );
}