import { Alert } from "@/components/ui/alert"
import { JSX, SVGProps } from "react"

interface SuccesData {
    message: string
}

export default function AlertaDeSucesso({ message }: SuccesData) {
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