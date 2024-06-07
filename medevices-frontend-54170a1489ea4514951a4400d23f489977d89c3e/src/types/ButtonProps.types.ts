export type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    onClick?: () => void;
    buttonText: string;
};
