import { forwardRef, useState } from "react";
import type { ChangeEvent, ComponentProps, FocusEvent, KeyboardEvent } from "react";

type DeferredDateInputProps = ComponentProps<"input">;

export const DeferredDateInput = forwardRef<HTMLInputElement, DeferredDateInputProps>(
    function DeferredDateInput(
        { value, onBlur, onChange, onFocus, onKeyDown, ...inputProps },
        ref,
    ) {
        const [draft, setDraft] = useState("");
        const [editing, setEditing] = useState(false);
        const formattedValue = String(value ?? "");

        const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
            setDraft(formattedValue);
            setEditing(true);
            onFocus?.(event);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setDraft(event.target.value);
            setEditing(true);
            onChange?.(event);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(event);

            if (event.key === "Enter" || event.key === "Escape") {
                setEditing(false);
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            setEditing(false);
            onBlur?.(event);
        };

        return (
            <input
                {...inputProps}
                ref={ref}
                value={editing ? draft : formattedValue}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
            />
        );
    },
);
