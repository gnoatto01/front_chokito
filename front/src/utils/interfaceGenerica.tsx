interface PropriedadesDialog {
    abrir: boolean;
    onFechar: () => void;
}

interface PropriedadesDialogEdicao<T> {
    abrir: boolean;
    onFechar: () => void;
    dados: T | null;
}