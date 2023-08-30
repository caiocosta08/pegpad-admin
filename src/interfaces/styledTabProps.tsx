export interface StyledTabProps {
    label: string;
    session_id: string;
    ticket_number: string;
    iconPosition?: "bottom" | "top" | "end" | "start" | undefined;
    icon?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
    href?: string;
    // handleClick?: (event: React.SyntheticEvent, newValue: number) => void;
    handleClick?: (e: any) => Promise<void>
  }