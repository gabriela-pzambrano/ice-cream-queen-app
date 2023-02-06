import React from "react";
import FormLogin from "../components/FormLogin";
import img from "../assets/logo-ice-cream-queen.svg";
import backTop from "../assets/back-top-ice-cream.svg";
import backTopMobile from "../assets/back-top-ice-cream-mobile.svg";
import backTopTablet from "../assets/back-top-ice-cream-tablet.svg";
import background from "../assets/background-ice.svg";


const Login = () => {
    const width = window.innerWidth;
    return (
        <section className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8 lg:pt-10 z-10">
                <section>
                    <img
                        className="mx-auto h-28 w-auto lg:h-24"
                        src={img}
                        alt="logo-ice-cream-queen"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-dark">
                        Bienvenido
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Loguéate para{' '}
                        <span className="font-medium text-primary-400">
                            ingresar al Dashboard
                        </span>
                    </p>
                </section>
                <FormLogin />
            </div>
            {
                width < 640
                    ? <img src={backTopMobile} alt="background-top-ice-cream" className="absolute top-0 w-full" />
                    : width > 640 && width < 1024
                        ? <img src={backTopTablet} alt="background-top-ice-cream" className="absolute top-0 w-full" />
                        : <img src={backTop} alt="background-top-ice-cream" className="absolute top-0 w-full" />
            }
            <img src={background} alt="background" className="absolute top-0 w-full h-full object-cover opacity-5" />
        </section>

    )
};

export default Login;