import { Box } from '@chakra-ui/react'
import CategoriesList from '../components/CategoriesList'
import AddCategory from '../components/AddCategory'

const Categories = () => (
    <Box>
        <CategoriesList />
        <AddCategory />
    </Box>
)

export default Categories;