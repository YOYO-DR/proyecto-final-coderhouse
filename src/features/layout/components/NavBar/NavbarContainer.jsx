import { useEffect } from "react"
import { useState } from "react"
import NavBar from "./components/NavBar"
import { getCategories } from "../../../../firebase/db"

const NavbarContainer = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // fetch('https://dummyjson.com/products/categories')
    //   .then(res => res.json())
    //   .then(data => setCategories(data));
    
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    })
  }, [])

  return (
    <NavBar categories={categories} isLoading={isLoading} />
  )
}

export default NavbarContainer