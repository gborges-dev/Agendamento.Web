import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AlunoListagem } from './screens/alunos/listagem/Index';
import { AulasListagem } from './screens/aulas/listagem/Index';
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to={'/alunos'}/>}/>
                <Route path='/alunos' element={<AlunoListagem />}/>
                <Route path='/aulas' element={<AulasListagem />}/>
            </Routes>
        </BrowserRouter>
    )
}