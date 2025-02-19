import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento

function Register() {
    const navigate = useNavigate(); // Hook para redirecionamento
    const [formData, setFormData] = useState({
        cpf: '',
        nome: '',
        email: '',
        senha: ''
    });
    const [errorMessage, setErrorMessage] = useState(""); // Estado para erro

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita recarregar a página

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao registrar');
            }

            navigate('/login'); 
        } catch (error: any) {
            setErrorMessage(error.message); 
        }
    };

    return (
        <div className='gap-1 flex text-left flex-col justify-center px-8 py-12 bg-white w-sm h-full rounded-lg border border-gray-400'>
            <h2 className="text-gray-900 text-2xl font-extrabold">Cadastre-se</h2>
            <span className="text-gray-900 text-sm">Preencha seus dados para se cadastrar.</span>

            {errorMessage && (
                <div className="text-red-600 text-sm bg-red-100 p-2 rounded-md my-2">
                    {errorMessage}
                </div>
            )}

            <form className="flex flex-col justify-start items-start py-2 w-full" onSubmit={handleSubmit}>
                <div className="my-4 h-14 w-full">
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF ou CNPJ"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome Completo"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="my-4 h-14 w-full">
                    <button
                        type="submit"
                        className="text-gray-200 text-xl font-bold rounded-lg w-full h-full bg-blue-600 hover:bg-blue-400 transition duration-300"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
