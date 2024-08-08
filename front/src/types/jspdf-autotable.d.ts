//TODO: tive que criar esse arquivo para que ele identificasse o autoTable

declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

declare module 'jspdf-autotable';
