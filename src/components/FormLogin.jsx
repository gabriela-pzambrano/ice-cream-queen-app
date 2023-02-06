import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
const FormLogin = () => {
    /* const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); */
    const initialValues = {
        email: "",
        password: "",
    };

    const [input, setInput] = useState(initialValues);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        setInput(initialValues);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <Input labelText={"Correo Electrónico:"} type={"email"} name={"email"} placeholder={"example@gmail.com"} onChange={handleChange} value={input.email}/>
            <Input labelText={"Password:"} type={"password"} name={"password"} placeholder={"**********"} onChange={handleChange} value={input.password} />
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="ml-1 block text-sm text-dark">
                        Recuerdame
                    </label>
                </div>

                <div className="text-xs">
                    <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-700 py-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>
    )
};

export default FormLogin;