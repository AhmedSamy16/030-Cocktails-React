import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import { useState } from "react"

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [cocktail, setCocktail] = useState(null)

    useEffect(() => {
        const getCocktail = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${URL}${id}`)
                const data = await res.json()
                if (data.drinks) {
                    const { 
                        strDrink: name, 
                        strDrinkThumb: image, 
                        strAlcoholic: alcoholic, 
                        strCategory: category, 
                        strGlass: glass, 
                        strInstructions: instructions,
                        strIngredient1,
                        strIngredient2,
                        strIngredient3,
                        strIngredient4,
                        strIngredient5,
                    } = data.drinks[0]
                    const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
                    setCocktail({
                        name,
                        image,
                        alcoholic,
                        category,
                        glass,
                        instructions,
                        ingredients
                    })
                } else {
                    setCocktail(null)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getCocktail()
    }, [id])

    if (loading) {
        return <Loading />
    }

    if (!cocktail) {
        return <h2 className="section-title">no cocktail to display</h2>
    }

    const { name, image, alcoholic, category, glass, instructions, ingredients } = cocktail
    return (
        <section className="section cocktail-section">
            <Link to="/" className="btn btn-primary">back home</Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name: </span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category: </span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">alcoholic: </span>
                        {alcoholic}
                    </p>
                    <p>
                        <span className="drink-data">glass: </span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">ingredients: </span>
                        {ingredients.map((item, index) => {
                            return item && <span key={index}>{item},</span>
                        })}
                    </p>
                    <p>
                        <span className="drink-data">instructions: </span>
                        {instructions}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SingleCocktail