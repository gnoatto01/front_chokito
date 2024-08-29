import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function CadastroAtendimento({ abrir, onFechar }: PropriedadesDialog) {
    return (
        <Dialog defaultOpen>
            <DialogTrigger asChild>
                <Button variant="outline">Cadastro de novo atendimento</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl">
                <div className="p-6 bg-background rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-primary">Cadastro de novo atendimento</h1>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="task-name">Nome da Tarefa</Label>
                                <Input id="task-name" placeholder="Digite o nome da tarefa" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="responsible">Responsável</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="john">John Doe</SelectItem>
                                        <SelectItem value="jane">Jane Smith</SelectItem>
                                        <SelectItem value="bob">Bob Johnson</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="start-date">Data de Início</Label>
                                <Input id="start-date" type="date" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="requester">Solicitante</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o solicitante" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="john">John Doe</SelectItem>
                                        <SelectItem value="jane">Jane Smith</SelectItem>
                                        <SelectItem value="bob">Bob Johnson</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="reported-issue">Problema Relatado</Label>
                                <Textarea id="reported-issue" placeholder="Descreva o problema relatado" className="min-h-[100px]" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="applied-solution">Solução Aplicada</Label>
                                <Textarea id="applied-solution" placeholder="Descreva a solução aplicada" className="min-h-[100px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="pending">Pendência</Label>
                                <Textarea id="pending" placeholder="Descreva a pendência, se houver" className="min-h-[100px]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                Salvar
                            </Button>
                            <Button variant="outline">Cancelar</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}