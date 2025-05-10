import * as React from "react";
import {
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  ItemText,
  ItemIndicator,
  ScrollUpButton,
  ScrollDownButton,
  Icon,
  Viewport,
} from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/util"; // ✅ FIXED: relative path

const Select = Root;

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between rounded-md border border-input bg-green-500 text-white px-4 py-2 text-sm shadow-sm hover:bg-green-600",
      className
    )}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDown className="ml-2 h-4 w-4" />
    </Icon>
  </Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = Value;

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-popover-foreground shadow-md",
      className
    )}
    {...props}
  >
    <ScrollUpButton className="flex justify-center">
      <ChevronUp className="h-4 w-4" />
    </ScrollUpButton>
    <Viewport className="p-1">{children}</Viewport>
    <ScrollDownButton className="flex justify-center">
      <ChevronDown className="h-4 w-4" />
    </ScrollDownButton>
  </Content>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-green-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <ItemText>{children}</ItemText>
    <ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </ItemIndicator>
  </Item>
));
SelectItem.displayName = "SelectItem";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
