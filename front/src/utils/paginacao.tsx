import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PropriedadesPaginacao {
    paginaAtual: number;
    totalDePaginas: number;
    onMudancaPagina: (pagina: number) => void;
}

const Paginacao: React.FC<PropriedadesPaginacao> = ({ paginaAtual, totalDePaginas, onMudancaPagina }) => {

    const maximoPaginaVisiveis = 5;
    let paginasVisiveis: number[] = [];

    if (totalDePaginas <= maximoPaginaVisiveis) {
        paginasVisiveis = Array.from({ length: totalDePaginas }, (_, i) => i + 1);
    } else {
        if (paginaAtual <= 3) {
            paginasVisiveis = [1, 2, 3, 4, 5];
        } else if (paginaAtual > totalDePaginas - 3) {
            paginasVisiveis = Array.from({ length: 5 }, (_, i) => totalDePaginas - 4 + i);
        } else {
            paginasVisiveis = Array.from({ length: 5 }, (_, i) => paginaAtual - 2 + i);
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                {/* Botão para a página anterior */}
                <PaginationItem>
                    <PaginationPrevious
                        className={`cursor-pointer ${paginaAtual === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (paginaAtual > 1) {
                                onMudancaPagina(paginaAtual - 1);
                            }
                        }}
                    />
                </PaginationItem>

                {/* Primeira página sempre visível */}
                {paginaAtual > 3 && totalDePaginas > maximoPaginaVisiveis && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onMudancaPagina(1);
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {/* Renderiza as páginas visíveis */}
                {paginasVisiveis.map((pagina) => (
                    <PaginationItem key={pagina}>
                        <PaginationLink
                            href="#"
                            isActive={pagina === paginaAtual}
                            onClick={(e) => {
                                e.preventDefault();
                                onMudancaPagina(pagina);
                            }}
                        >
                            {pagina}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Última página sempre visível */}
                {paginaAtual < totalDePaginas - 2 && totalDePaginas > maximoPaginaVisiveis && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onMudancaPagina(totalDePaginas);
                                }}
                            >
                                {totalDePaginas}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Botão para a próxima página */}
                <PaginationItem>
                    <PaginationNext
                        className={`cursor-pointer ${paginaAtual === totalDePaginas ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (paginaAtual < totalDePaginas) {
                                onMudancaPagina(paginaAtual + 1);
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default Paginacao;
