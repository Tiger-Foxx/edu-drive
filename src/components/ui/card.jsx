
// eslint-disable-next-line react/prop-types
export function Card({ children, className }) {
    return (
        <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
}

// eslint-disable-next-line react/prop-types
export function CardHeader({ children, className }) {
    return <div className={`border-b p-4 ${className}`}>{children}</div>;
}

// eslint-disable-next-line react/prop-types
export function CardTitle({ children, className }) {
    return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

// eslint-disable-next-line react/prop-types
export function CardContent({ children, className }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}
