import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const CurrencyField = ({
    value,
    onChange,
    id,
    name,
    text,
    prefix = "",
    disabled = false,
    Lwidth = "35%",
    Iwidth = "65%",
    custom = "",
}) => {
    return (
        <div className={"form-group d-flex align-items-center " + custom}>
            <div style={{ width: Lwidth }}>
                <label>{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                <CurrencyInput
                    allowDecimals
                    decimalSeparator="."
                    id={id}
                    className="form-control"
                    name={name}
                    prefix={prefix}
                    value={value}
                    onValueChange={onChange}
                    step={1}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default CurrencyField;
