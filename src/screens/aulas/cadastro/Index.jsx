import { Autocomplete, FormControl, TextField } from "@mui/material";
import { ModalCadastro } from "../../../components/modal/Index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";

import * as S from "./styles";
import { useState, useEffect } from "react";

export const AulasCadastro = ({ isOpen, onClose, onRefresh, aula }) => {
    if (!isOpen) return <></>;

    const [Descricao, setDescricao] = useState('');
    const [TipoAula, setTipoAula] = useState();
    const [DataHora, setDataHora] = useState('');
    const [Capacidade, setCapacidade] = useState('');
    const [Status, setStatus] = useState('');
    const [PermiteAgendamentoPosInicio, setPermiteAgendamentoPosInicio] = useState('');
    const [Participantes, setParticipantes] = useState(null);
    const [errors, setErrors] = useState({
        Descricao: false,
        TipoAula: false,
        DataHora: false,
        Capacidade: false,
        Status: false,
        PermiteAgendamentoPosInicio: false,
        Participantes: false,
    });

    
    useEffect(() => {
        if (aula) {
            setDescricao(aula.Descricao || '');
            setTipoAula(aula.TipoAula || '');
            setDataHora(aula.DataHora ? new Date(aula.DataHora) : null);
            setCapacidade(aula.Capacidade || '');
            setStatus(aula.Status || 0);
            setPermiteAgendamentoPosInicio(aula.PermiteAgendamentoPosInicio || '');
            setParticipantes(aula.Participantes || []);
        } else {
            setDescricao('');
            setTipoAula('');
            setDataHora(null);
            setCapacidade('');
            setStatus(0);
            setPermiteAgendamentoPosInicio('');
            setParticipantes(null);
        }
    }, [aula]);

    const handleSave = () => {
        const newErrors = {
            Descricao: !Descricao,
            TipoAula: !TipoAula,
            DataHora: !DataHora,
            Capacidade: !Capacidade,
            Status: !Status,
            PermiteAgendamentoPosInicio: !PermiteAgendamentoPosInicio,
            Participantes: !Participantes,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        const aulaDto = {
            Descricao: Descricao,
            TipoAula: TipoAula,
            DataHora: DataHora,
            Capacidade: Capacidade,
            Status: Status,
            PermiteAgendamentoPosInicio: PermiteAgendamentoPosInicio,
            Participantes: Participantes,
        };

        const method = aula ? 'PUT' : 'POST';
        const url = aula
            ? `http://localhost:3003/aulas/${aula.id}`
            : 'http://localhost:3003/aulas'; 

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
            console.log(aula ? 'Aula atualizada com sucesso:' : 'Aula cadastrada com sucesso:', data);
            onClose();
            onRefresh();
        })
        .catch(error => {
            console.error('Erro ao salvar a aula:', error);
        });
    };

    const options = [
        { label: 'Cross', id: 1 },
        { label: 'Musculação', id: 2 },
        { label: 'Pilates', id: 3 },
    ];

    return (
        <ModalCadastro 
            title={aula ? "Editar aula" : "Agendar aula"}
            isOpen={isOpen} 
            handleClose={onClose} 
            handleSave={handleSave}>
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
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DatePicker
                                label="Data/hora da aula"
                                value={DataHora}
                                onChange={(newValue) => setDataHora(newValue)}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        required
                                        error={errors.DataHora}
                                        helperText={errors.DataHora ? "Data é obrigatória" : ""}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={TipoAula}
                            onChange={(event, newValue) => setTipoAula(newValue ? newValue : null)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Aula"
                                    error={errors.TipoAula}
                                    helperText={errors.TipoAula ? "Tipo de aula é obrigatório" : ""}
                                />
                            )}
                        />
                    </S.Form>
                </FormControl>
        </ModalCadastro>
    );
};