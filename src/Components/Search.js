import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Paper from '@mui/material/Paper'

Search.propTypes = {
    onSubmit: PropTypes.func,
}

Search.defaultProps = {
    onSubmit: null,
}

function Search({ parentCallback }) {
    const [setSearchTerm] = useState('')
    const handleSearchTermChange = (event) => {
        const value = event.target.value
        parentCallback(value)
    }

    return (
        <div>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1, borderRadius: '100px' }}
                    placeholder="Search ..."
                    onChange={handleSearchTermChange}
                    size="small"
                />
                <IconButton sx={{ p: '10px', outline: 'none' }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    )
}

export default Search
