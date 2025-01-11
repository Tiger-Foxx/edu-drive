import classNames from 'classnames';

type AlertVariant = 'default' | 'destructive' | 'success' | 'info';

interface AlertProps {
    variant?: AlertVariant;
    className?: string;
    children: React.ReactNode;
}

interface AlertDescriptionProps {
    className?: string;
    children: React.ReactNode;
}

// Les styles de base pour les différentes variantes
const alertVariants = {
    default: 'bg-white text-blue-700 border border-blue-200',
    destructive: 'bg-red-50 text-red-700 border border-red-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
};

// Composant Alert principal
export const Alert: React.FC<AlertProps> = ({ variant = 'default', className, children }) => {
    return (
        <div
            className={classNames(
                'relative p-4 rounded-lg shadow-md flex items-start gap-4',
                alertVariants[variant],
                className
            )}
        >
            {children}
        </div>
    );
};

// Composant AlertDescription
export const AlertDescription: React.FC<AlertDescriptionProps> = ({ className, children }) => {
    return (
        <div className={classNames('text-sm', className)}>
            {children}
        </div>
    );
};
