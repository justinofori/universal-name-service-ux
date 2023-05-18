import * as React from "react"

import { useSearchField } from 'react-aria'
import { useSearchFieldState } from "react-stately"
import { AriaSearchFieldProps } from "react-aria"
import {useFocusRing} from 'react-aria'

import { cn } from "@/lib/utils"

export interface InputProps extends AriaSearchFieldProps {
  className?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onSubmit, onChange, type, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const state = useSearchFieldState(props);
    const { inputProps, labelProps } = useSearchField(props, state, inputRef);

    const handleFormSubmit: React.FormEventHandler<HTMLInputElement> = (event) => {
      event.preventDefault();
      if (onSubmit) {
        const { value } = event.currentTarget;
        onSubmit(value);
      }
    };

    const { focusProps } = useFocusRing();

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onSubmit={handleFormSubmit}
        ref={inputRef}
        {...inputProps}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
