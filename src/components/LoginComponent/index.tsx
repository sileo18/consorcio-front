import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();

    function onRegisterClick() {
        navigate("/register")
    }

     const [formData, setFormData] = useState({
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
            e.preventDefault();
    
            try {
                const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao registrar');
                }

                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.token);
    
                navigate('/'); 
            } catch (error: any) {
                setErrorMessage(error.message); 
            }
        };

    return (
        <div className='gap-1 flex text-left flex-col justify-center px-8 py-12 bg-white w-sm h-full rounded-lg border-1 border-gray-400 '>
            <h2 className="text-gray-900 text-2xl font-extrabold">Acessar Conta</h2>
            <span className="text-gray-900 text-sm ">Preencha seus dados de acesso para continuar.</span>

            {errorMessage && (
                <div className="text-red-600 text-sm bg-red-100 p-2 rounded-md my-2">
                    {errorMessage}
                </div>
            )}

            <form className="flex flex-col justify-start items-start py-2" onSubmit={handleSubmit}>
                <div className="my-4 h-14 w-full">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-lg w-full h-full px-4 font-normal border-1 border-gray-400 ease-in-out hover:border-gray-300 hover:border-gray-300"
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
                        className="rounded-lg w-full h-full px-4 font-normal border-1 border-gray-400 ease-in-out hover:border-gray-300 hover:border-gray-300"
                    />
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="submit"
                        value="Login"
                        required
                        className="text-gray-200 text-xl font-bold rounded-lg w-full h-full px-4 font-normal border-none cursor-pointer bg-blue-600 ease-in-out hover:bg-blue-400"
                    />
                </div>
            </form>

            <span className="text-gray-500 text-sm ">Ainda não possui uma conta?</span>
            <span onClick={onRegisterClick} className="text-blue-600 text-sm cursor-pointer hover:text-blue-400">Crie uma agora mesmo!</span>
            
        </div>
    );
}

export default Login;