import React, { useEffect, useState, useCallback } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress,
    debounce,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const SelectFetch = ({
    name,
    label,
    optionValue,
    optionLabel,
    fetchOptions,
    value,
    onChange,
    fetchDepedency,
}) => {
    const {
        formState: { errors },
        watch,
    } = useFormContext();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const CallbackfetchOptions = useCallback(async () => {
        setLoading(true);
        try {
            let data = [];

            if (fetchDepedency) {
                const fieldfetchDepedency = watch(fetchDepedency);
                data = await fetchOptions(fieldfetchDepedency.value);
            }
            else data = await fetchOptions();

            const mappedData = data.map((obj) => ({
                name: obj?.[optionLabel],
                value: obj?.[optionValue],
            }));
            setOptions(mappedData);
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
        setLoading(false);
    }, [fetchOptions]);

    useEffect(() => {
        CallbackfetchOptions();
    }, [fetchDepedency]);

    return (
        <FormControl
            variant="outlined"
            fullWidth
            error={!!errors[name]}
        >
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange} label={label}>
                {loading ? (
                    <MenuItem disabled>
                        <CircularProgress size={24} />
                    </MenuItem>
                ) : (
                    options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))
                )}
            </Select>
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    )
}

export default SelectFetch;