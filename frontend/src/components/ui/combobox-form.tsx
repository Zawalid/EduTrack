import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { UseFormReturn } from "react-hook-form";

interface ComboboxFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  items: string[];
  placeholder?: string;
  emptyText?: string;
}

export function ComboboxForm({
  form,
  name,
  label,
  items,
  placeholder = "Select an option",
  emptyText = "No results found.",
}: ComboboxFormProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(form.getValues(name) || "");
  const [options, setOptions] = React.useState(items);

  const updateValue = (value: string) => {
    setValue(value);
    form.setValue(name, value, { shouldDirty: true, shouldValidate: true });
  };

  const handleSelect = (currentValue: string) => {
    updateValue(currentValue);
    setOpen(false);
  };

  const handleInputChange = (inputValue: string) => {
    updateValue(inputValue);
    const filtered = items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()));
    if (inputValue && !filtered.includes(inputValue)) setOptions([...filtered, inputValue]);
    else setOptions(filtered);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value || placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={placeholder}
                    value={value}
                    onValueChange={handleInputChange}
                  />
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {options.map((item) => (
                        <CommandItem key={item} value={item} onSelect={handleSelect}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === item ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
