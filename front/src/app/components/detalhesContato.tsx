"use client";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { ArrowLeftIcon, ClockIcon, BookmarkIcon } from "@radix-ui/react-icons";

interface interfaceDetalhes {
    abrir: boolean;
    onFechar: () => void;
    contato: {
        idContato: number;
        nomeContato: string;
        email: string;
        telefone: string;
        whatsapp: string;
        descricaoContato: string;
    } | null;
}

function DetalhesContato({ abrir, onFechar, contato }: interfaceDetalhes) {
    if (!contato) return null;

    const whatsappUrl = `https://wa.me/${contato.whatsapp}?text=Olá...`;

    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="max-w-[800px] w-full">
                <DialogTitle>Detalhes</DialogTitle>
                <DialogDescription>Gerencie seu contato</DialogDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    <div className="col-span-1 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="bg-muted p-6 h-full">
                            <div className="flex items-center gap-4 h-full">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback>{contato.nomeContato.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="overflow-hidden">
                                    <h2 className="text-lg font-semibold">{contato.nomeContato}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="p-6 grid gap-4 h-full">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Detalhes do contato</h3>
                                <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                                    <div>
                                        <Label htmlFor="name">Nome</Label>
                                        <Input id="name" defaultValue={contato.nomeContato} />
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={contato.email} />
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <Label htmlFor="phone" className="flex-1">Telefone</Label>
                                        </div>
                                        <Input id="phone" type="tel" defaultValue={contato.telefone} />
                                        <div className="flex items-center mt-4">
                                            <Label htmlFor="whatsapp" className="flex-1">Whatsapp</Label>
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                <FaWhatsapp size={24} className="text-lg ml-2 mb-2" />
                                            </a>
                                        </div>
                                        <Input id="whatsapp" type="text" defaultValue={contato.whatsapp} />
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Sobre</h3>
                                <div className="grid w-full gap- text-muted-foreground">
                                    <div>
                                        <Label htmlFor="obs">Observações</Label>
                                        <Textarea id="obs" rows={5} defaultValue={contato.descricaoContato} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button onClick={onFechar} className="bg-[#EA4335] hover:bg-[#75221B]">Voltar</Button>
                                <Button className="bg-[#34A853] hover:bg-[#2E8B57]">Salvar alterações</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default DetalhesContato;
