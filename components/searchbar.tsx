import * as React from "react";

import { Button, ButtonProps } from "./ui/button"
import { Input, InputProps } from "./ui/input"


interface SearchBarProps {
    onSubmit: (value: string) => void;
    inputProps?: InputProps & { value?: string };
    buttonProps?: ButtonProps;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, inputProps, buttonProps }) => {

    const [value, setValue] = React.useState("");

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(value);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className='flex mb-5 font-bold'>
            <Input
                onSubmit={handleSubmit}
                value={value}
                onChange={handleChange}
                {...inputProps}
                aria-label="Search input bar"
            />
            <Button variant="default" size="default" onClick={handleSubmit} {...buttonProps}>
                Search
            </Button>
        </div>
    )
}

export default SearchBar