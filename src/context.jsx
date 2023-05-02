import { useContext, useEffect, createContext, useState } from "react";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('a')
    const [cocktails, setCocktails] = useState([])

    useEffect(() => {
        const fetchDrinks = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${URL}${searchTerm}`)
                const data = await response.json()
                const { drinks } = data
                if (drinks) {
                    const newCocktails = drinks.map((item) => {
                        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
                        return {
                            id: idDrink,
                            name: strDrink,
                            image: strDrinkThumb,
                            alcoholic: strAlcoholic,
                            glass: strGlass
                        }
                    })
                    setCocktails(newCocktails)
                } else {
                    setCocktails([])
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDrinks()
    }, [searchTerm])

    return <AppContext.Provider value={{ loading, setSearchTerm, cocktails }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}