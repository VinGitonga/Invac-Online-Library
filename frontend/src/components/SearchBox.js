import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory()

    const clickSubmit = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else
            history.push('/browse')
    }

    return (
        <form onSubmit={clickSubmit}>
            <InputGroup display="block" ml="auto">
                <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineSearch />}
                />
                <Input type="text" placeholder="Search Book..." onChange={e => setKeyword(e.target.value)} />
            </InputGroup>
        </form>
    )
}

export default SearchBox;
