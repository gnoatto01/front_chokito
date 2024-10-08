import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import React, { JSX, SVGProps } from "react"

interface DataAlerta {
    message: string
}

interface AlertaDeConfirmacaoProps {
    titulo: string;
    descricao: string;
    isAberto: boolean;
    onFechar: () => void;
    onConfirmacao: () => void;


}

export function AlertaDeSucesso({ message }: DataAlerta) {
    return (
        <Alert className="bg-green-500 text-white rounded-md">
            <div className="flex items-center space-x-3 p-4">
                <CheckIcon className="h-6 w-6" />
                <div>
                    <h3 className="text-lg font-medium">Sucesso!</h3>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        </Alert>
    )
}

const AlertaDePerigo: React.FC<AlertaDeConfirmacaoProps> = ({ titulo, descricao, isAberto, onFechar, onConfirmacao }) => {
    return (
        <AlertDialog open={isAberto} onOpenChange={onFechar}>
            <AlertDialogTrigger asChild>
                <button style={{ display: 'none' }}></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>{titulo}</AlertDialogTitle>
                <AlertDialogDescription>
                    {descricao}
                </AlertDialogDescription>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <AlertDialogAction asChild>
                        <Button className="bg-[#34A853] hover:bg-[#2E8B47]" onClick={onFechar}>Não</Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                        <Button className="bg-[#EA4335] hover:bg-[#D3322D]" onClick={onConfirmacao}>Sim</Button>
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );

};
export default AlertaDePerigo;



function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}