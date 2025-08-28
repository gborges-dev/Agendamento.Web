import { useEffect, useState } from "react";
import { ModalCadastro } from "../../../components/modal/Index";
import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material";
import * as S from "./styles";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de, ptBR } from "date-fns/locale";
import { ParticipantesDaAula } from "./participantes/Index";
import CheckIcon from '@mui/icons-material/Check'
import Alert from '@mui/material/Alert';

export const AgendarAula = ({ isOpen, onClose, onRefresh, aula }) => {
    if (!isOpen) return <></>;
    
    const [Descricao, setDescricao] = useState('');
    const [TipoAula, setTipoAula] = useState(null);
    const [DataHora, setDataHora] = useState('');
    const [Capacidade, setCapacidade] = useState(0);
    const [Status, setStatus] = useState(null);
    const [PermiteAgendamentoPosInicio, setPermiteAgendamentoPosInicio] = useState(false);
    const [Participantes, setParticipantes] = useState([]);
    const [errors, setErrors] = useState({
        Descricao: false,
        TipoAula: false,
        DataHora: false,
        Capacidade: false,
        Status: false,
        Participantes: false
    });

    useEffect(() => {
        if (aula) {
            setDescricao(aula.Descricao || '');
            setTipoAula(enumTipoAula.find((tipo) => tipo.id === aula?.TipoAula?.id) || null);
            setDataHora(aula.DataHora ? new Date(aula.DataHora) : null);
            setCapacidade(aula.Capacidade || 0);
            setStatus(enumStatus.find((status) => status.id === aula?.Status?.id) || null);
            setPermiteAgendamentoPosInicio(aula.PermiteAgendamentoPosInicio || false);
            setParticipantes(aula.Participantes || []);
        }
    }, [aula]);

    const handleSave = (finalizar = false, updatedAula) => {
        const aulaDto = finalizar ? updatedAula : {
            Descricao: Descricao,
            TipoAula: TipoAula,
            DataHora: DataHora ? DataHora.toISOString() : null,
            Capacidade: parseInt(Capacidade),
            Status: Status,
            PermiteAgendamentoPosInicio: PermiteAgendamentoPosInicio,
            Participantes: Participantes,
        };

        const method = 'PUT';
        const url = `http://localhost:3003/aulas/${aula.id}`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aulaDto),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Aula finalizada com sucesso:', data);
            onClose();
            onRefresh();
        })
        .catch(error => {
            console.error('Erro ao finalizar a aula:', error);
        });
    };

    const handleAdicionarParticipante = (participante) => {
        if (!participante) return;
    };

    const handleRemoverParticipante = (participanteId) => {
        const updatedParticipantes = Participantes.filter((p) => p.id !== participanteId);
        setParticipantes(updatedParticipantes);
    };

    const handleFinalizarAula = () => {
        setStatus((prevStatus) => {
            const statusConcluida = enumStatus.find((status) => status.label === "Concluída");

            handleSave(true, {
                ...aula,
                Status: statusConcluida,
            });
            return statusConcluida;
        });
    };

    const enumTipoAula = [
        { label: 'Cross', id: 1 },
        { label: 'Musculação', id: 2 },
        { label: 'Pilates', id: 3 },
    ];
    const enumStatus = [
        { label: 'Aberta', id: 1 },
        { label: 'Concluída', id: 2 }
    ];

    return (
        <ModalCadastro 
            title={"Editar aula"}
            isOpen={isOpen} 
            handleClose={onClose} 
            handleSave={() => handleSave(false, aula)}>
                <S.Row>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <S.Form>
                            <TextField
                                required
                                label="Descrição"
                                variant="standard"
                                value={Descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                error={errors.Descricao}
                                helperText={errors.Descricao ? "Descrição é obrigatória" : ""}
                                disabled={Status && Status.label === "Concluída"}
                            />

                            <Autocomplete
                                disablePortal
                                options={enumTipoAula}
                                value={TipoAula}
                                onChange={(event, newValue) => {
                                    setTipoAula(newValue ? newValue : null)
                                }}
                                disabled={Status && Status.label === "Concluída"}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Aula"
                                        error={errors.TipoAula}
                                        helperText={errors.TipoAula ? "Tipo de aula é obrigatório" : ""}
                                    />
                                )}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                <DateTimePicker
                                    label="Data/hora da aula"
                                    value={DataHora}
                                    onChange={(newValue) => setDataHora(newValue)}
                                    disabled={Status && Status.label === "Concluída"}
                                    inputFormat="dd/MM/yyyy HH:mm"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            required
                                            error={errors.DataHora}
                                            helperText={errors.DataHora ? "Data/hora é obrigatória" : ""}
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                            <TextField
                            label="Capacidade de alunos"
                            type="number"
                            variant="standard"
                            value={Capacidade}
                            onChange={(e) => setCapacidade(e.target.value)}
                            disabled={Status && Status.label === "Concluída"}
                            error={errors.Capacidade}
                            helperText={errors.Capacidade ? "Capacidade é obrigatória" : ""}
                            />

                            <Autocomplete
                                disablePortal
                                options={enumStatus}
                                disabled={Status && Status.label === "Concluída"}
                                value={Status}
                                onChange={(event, newValue) => setStatus(newValue ? newValue : null)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Status"
                                        error={errors.Status}
                                        helperText={errors.Status ? "Status é obrigatório" : ""}
                                    />
                                )}
                            />
                            <FormControlLabel
                            control={
                                <Checkbox checked={PermiteAgendamentoPosInicio} 
                                    disabled={Status && Status.label === "Concluída"}
                                    onChange={(event, newValue) => setPermiteAgendamentoPosInicio(newValue ? newValue : null)}
                                />}
                            label="Permite agendamento pós início"
                            />
                            <Button 
                                variant="contained" 
                                size="medium" 
                                startIcon={<CheckIcon />} 
                                color="success" 
                                onClick={() => handleFinalizarAula()}
                                disabled={Status && Status.label === "Concluída"}>
                                Finalizar aula
                            </Button>
                        </S.Form>
                    </FormControl>
                    <ParticipantesDaAula aula={aula} onDisabled={Status && Status.label === "Concluída"} participantes={Participantes} onAdicionar={handleAdicionarParticipante} onRemover={handleRemoverParticipante} Capacidade={Capacidade}/>
                </S.Row>
        </ModalCadastro>
    )
}