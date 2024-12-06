export const markPage = (pathname: string | undefined, href: string, className: string) =>
    pathname === href ? className : "";

export const routeLayer = (pathname: string, layer: number): string | undefined => {
    const parts = pathname.split('/').filter(part => part.length > 0);
    return `/${parts[layer - 1]}`;
}

export const formatDateToBR = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}