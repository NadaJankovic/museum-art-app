import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


export default function SearchBarComponent(props) {
    return (
        <>
            <FormControl className='radio-btns' component="fieldset">
                <RadioGroup
                    row
                    aria-label="artGroup"
                    name="filter"
                    value={props.radioValue}
                    onChange={props.handleChange}
                >
                    <FormControlLabel
                        value="all"
                        control={<Radio color='primary' />}
                        label="All" />
                    <FormControlLabel
                        value="painting"
                        control={<Radio color='primary' />}
                        label="Painting"
                    />
                    <FormControlLabel
                        value="potery"
                        control={<Radio color='primary' />}
                        label="Potteries"
                    />
                </RadioGroup>
            </FormControl>
            <TextField
                className='search-input'
                size='small'
                type="search"
                variant='outlined'
                onChange={props.handleInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            >
            </TextField>
        </>
    )
}