import React from "react";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline"


const product =
{
    id: 1,
    name: 'Helado de Copa',
    href: '#',
    imageSrc: 'https://s3.amazonaws.com/businessinsider.mx/wp-content/uploads/2020/08/13094835/heladoportada.jpg',
    imageAlt: "Helado de Copa",
    price: '35.00',
    color: 'Black',
    type: "Postre"
}

const CardProduct = () => {
    return (
        <section key={product.id} className="flex flex-col gap-2 bg-white rounded-3xl w-full p-3 shadow-md sm:w-52">
            <div className="relative">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-52 object-cover rounded-[20px] sm:h-[120px]"
                />
                <span className="absolute top-3 right-3 bg-primary-500 py-1 px-4 rounded-md text-white sm:text-xs" >{product.type}</span>
            </div>
            <section className="flex flex-col items-center justify-center gap-2 relative pb-10">
                <h3 className="text-dark font-bold text-3xl sm:text-sm">
                    {product.name}
                </h3>
                <p className="bg-primary-500 py-1 px-4 rounded-md text-white text-lg sm:text-xs font-semibold">s/.{product.price}</p>
                <button
                type="button"
                className="rounded-full bg-primary-500 p-3 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:bg-primary-700 focus:ring-offset-2 absolute bottom-0 right-0"
            >
                <ArrowUturnRightIcon className="h-6 sm:h-4 w-6 sm:w-4" aria-hidden="true"/>
            </button>
            </section>
        </section>
    )
};

export default CardProduct;