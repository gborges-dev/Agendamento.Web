import { Autocomplete, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material";
import { ModalCadastro } from "../../../components/modal/Index";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Alterado para DateTimePicker
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";

import * as S from "./styles";
import { useState } from "react";

export const AulasCadastro = ({ isOpen, onClose, onRefresh }) => {
    if (!isOpen) return <></>;

    const [Descricao, setDescricao] = useState('');
    const [TipoAula, setTipoAula] = useState(null);
    const [DataHora, setDataHora] = useState('');
    const [Capacidade, setCapacidade] = useState('');
    const [Status, setStatus] = useState(null);
    const [PermiteAgendamentoPosInicio, setPermiteAgendamentoPosInicio] = useState(false);
    const [errors, setErrors] = useState({
        Descricao: false,
        TipoAula: false,
        DataHora: false,
        Capacidade: false,
        Status: false,
    });

    const handleSave = () => {
        const newErrors = {
            Descricao: !Descricao,
            TipoAula: !TipoAula,
            DataHora: !DataHora,
            Capacidade: !Capacidade,
            Status: !Status,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        const aulaDto = {
            Descricao: Descricao,
            TipoAula: TipoAula,
            DataHora: DataHora ? DataHora.toISOString() : null, // Converte para string ISO
            Capacidade: Capacidade,
            Status: Status,
            PermiteAgendamentoPosInicio: PermiteAgendamentoPosInicio,
        };

        const method = 'POST';
        const url = 'http://localhost:3003/aulas';

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
            console.log('Aula cadastrada com sucesso:', data);
            onClose();
            onRefresh();
        })
        .catch(error => {
            console.error('Erro ao salvar a aula:', error);
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
            title={"Cadastrar aula"}
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

                        <Autocomplete
                            disablePortal
                            options={enumTipoAula}
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

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DateTimePicker
                                label="Data/hora da aula"
                                value={DataHora}
                                onChange={(newValue) => setDataHora(newValue)}
                                inputFormat="dd/MM/yyyy HH:mm" // Formato de data e hora
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
                          error={errors.Capacidade}
                          helperText={errors.Capacidade ? "Capacidade é obrigatória" : ""}
                        />

                        <Autocomplete
                            disablePortal
                            options={enumStatus}
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
                            <Checkbox value={PermiteAgendamentoPosInicio} 
                                onChange={(event, newValue) => setPermiteAgendamentoPosInicio(newValue ? newValue : null)}
                            />}
                          label="Permite agendamento pós início"
                        />
                    </S.Form>
                </FormControl>
        </ModalCadastro>
    );
};