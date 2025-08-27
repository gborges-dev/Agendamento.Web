import { Autocomplete, FormControl, TextField } from "@mui/material";
import { ModalCadastro } from "../../../components/modal/Index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";

import * as S from "./styles";
import { useState, useEffect } from "react";

export const AlunoCadastro = ({ isOpen, onClose, onRefresh, aluno }) => {
    if (!isOpen) return <></>;

    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date);
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tipoPlano, setTipoPlano] = useState(null);
    const [errors, setErrors] = useState({
        nome: false,
        dataNascimento: false,
        cpf: false,
        cidade: false,
        bairro: false,
        endereco: false,
        tipoPlano: false,
    });

    
    useEffect(() => {
        if (aluno) {
            setNome(aluno.Nome || '');
            setDataNascimento(aluno.DataNascimento ? new Date(aluno.DataNascimento) : null);
            setCpf(aluno.CPF || '');
            setCidade(aluno.Cidade || '');
            setBairro(aluno.Bairro || '');
            setEndereco(aluno.Endereco || '');
            setTipoPlano(aluno.TipoPlano || null);
        } else {
            setNome('');
            setDataNascimento(null);
            setCpf('');
            setCidade('');
            setBairro('');
            setEndereco('');
            setTipoPlano(null);
        }
    }, [aluno]);

    const handleSave = () => {
        const newErrors = {
            nome: !nome,
            dataNascimento: !dataNascimento,
            cpf: !cpf,
            cidade: !cidade,
            bairro: !bairro,
            endereco: !endereco,
            tipoPlano: !tipoPlano,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err)) return;

        const alunoData = {
            Nome: nome,
            DataNascimento: dataNascimento,
            CPF: cpf,
            Cidade: cidade,
            Bairro: bairro,
            Endereco: endereco,
            TipoPlano: tipoPlano,
        };

        const method = aluno ? 'PUT' : 'POST';
        const url = aluno
            ? `http://localhost:3003/alunos/${aluno.id}`
            : 'http://localhost:3003/alunos'; 

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(aluno ? 'Aluno atualizado com sucesso:' : 'Aluno cadastrado com sucesso:', data);
            onClose();
            onRefresh();
        })
        .catch(error => {
            console.error('Erro ao salvar o aluno:', error);
        });
    };

    const options = [
        { label: 'Mensal', id: 1 },
        { label: 'Trimestral', id: 2 },
        { label: 'Anual', id: 3 },
    ];

    return (
        <ModalCadastro 
            title={aluno ? "Editar Aluno" : "Cadastrar Aluno"}
            isOpen={isOpen} 
            handleClose={onClose} 
            handleSave={handleSave}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <S.Form>
                        <TextField
                            required
                            label="Nome"
                            variant="standard"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            error={errors.nome}
                            helperText={errors.nome ? "Nome é obrigatório" : ""}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DatePicker
                                label="Data de Nascimento"
                                value={dataNascimento}
                                onChange={(newValue) => setDataNascimento(newValue)}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        required
                                        error={errors.dataNascimento}
                                        helperText={errors.dataNascimento ? "Data é obrigatória" : ""}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="CPF"
                            variant="standard"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            error={errors.cpf}
                            helperText={errors.cpf ? "CPF é obrigatório" : ""}
                        />
                        <TextField
                            label="Cidade"
                            variant="standard"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            error={errors.cidade}
                            helperText={errors.cidade ? "Cidade é obrigatória" : ""}
                        />
                        <TextField
                            label="Bairro"
                            variant="standard"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            error={errors.bairro}
                            helperText={errors.bairro ? "Bairro é obrigatório" : ""}
                        />
                        <TextField
                            label="Endereço"
                            variant="standard"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            error={errors.endereco}
                            helperText={errors.endereco ? "Endereço é obrigatório" : ""}
                        />
                        
                        <Autocomplete
                            disablePortal
                            options={options}
                            value={tipoPlano}
                            onChange={(event, newValue) => setTipoPlano(newValue ? newValue : null)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Plano"
                                    error={errors.tipoPlano}
                                    helperText={errors.tipoPlano ? "Plano é obrigatório" : ""}
                                />
                            )}
                        />
                    </S.Form>
                </FormControl>
        </ModalCadastro>
    );
};