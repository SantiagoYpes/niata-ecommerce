import { useContext } from "react";
import ProductContext from "../context/ProductsProvider";
import { UseProductsContextType } from "../context/ProductsProvider";

const useProducts = ():UseProductsContextType =>{
    return useContext(ProductContext)
}

export default useProducts